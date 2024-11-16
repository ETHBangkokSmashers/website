import supabase, { Tables } from "@/helpers/supabase"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useEncAccount } from "@/hooks/useFullAccount"
import OrderInfo from "@/components/OrderInfo"
import cx from "clsx"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import Spinner from "@/components/Spinner"
import { wagmiConfig } from "@/helpers/wagmiConfig"
import { usePublicClient, useReadContract, useWriteContract } from "wagmi"
import { readContract } from "@wagmi/core"
import tradeEntryABI from "@/helpers/tradeEntryABI"
import { numberToHex, padHex, formatUnits, parseUnits } from "viem"
import { wait } from "@/helpers/wait"
import { fireConfetti } from "@/helpers/fireConfetti"
import { chainConfig } from "@/helpers/chainConfig"
import { ZERO_ADDRESS, TARGET_TOKENS } from "@/routes/create"
import eacaAggregatorProxy from "@/helpers/eacaAggregatorProxy"
import { useOrderInfo } from "./utils/useOrderInfo"

function Button({
  children,
  className,
  isDisabled,
  isLoading,
  onClick,
}: {
  children: any
  className: string
  isDisabled?: boolean
  isLoading?: boolean
  onClick?(): void
}) {
  return (
    <div
      className={cx(
        "flex h-14 items-center justify-center rounded-2xl px-4 transition",
        className,
        {
          "cursor-not-allowed opacity-20": isDisabled,
        },
      )}
      onClick={onClick}
    >
      {isLoading && (
        <Spinner className="mr-4 size-6 fill-black text-black/20" />
      )}
      <div className="text-center text-lg font-medium">{children}</div>
    </div>
  )
}

function ClaimButton({
  order,
  roundId,
}: {
  order: Tables<"orders">
  roundId: string
}) {
  const params = useParams()
  const profileAddress = (params.address as string).toLowerCase()

  const queryClient = useQueryClient()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()
  const [isSubmitting, setSubmitting] = useState(false)

  const betToken =
    chainConfig[order.chain_id].tokens[order.source_ticker.toLowerCase()]!

  const contractAddress = chainConfig[order.chain_id].tradeEntryAddress!

  const isButtonDisabled = !publicClient

  const claim = async () => {
    if (!publicClient || isSubmitting) {
      return
    }

    try {
      setSubmitting(true)

      // TODO rewrite to safety variant
      const targetTokenId =
        TARGET_TOKENS.map((ticker) => {
          return ticker.toLowerCase()
        }).indexOf(order.target_ticker) + 1

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: tradeEntryABI,
        functionName: "settleTrade",
        args: [
          {
            depositAsset: betToken.address,
            initiator: order.owner as `0x${string}`,
            initiatorAmount: BigInt(order.bet_amount),
            acceptor: ZERO_ADDRESS,
            acceptorAmount: BigInt(order.bet_amount), // TODO change
            acceptionDeadline: BigInt(order.deadline),
            expiry: BigInt(order.expires_at),
            observationAssetId: targetTokenId,
            direction: order.direction,
            price: parseUnits(String(order.target_price), 18),
            dataSourceId: order.data_source_id,
            nonce: BigInt(order.nonce),
          },
          roundId as any,
        ],
      })

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })

      const { data, error } = await supabase
        .from("orders")
        .update({ is_claimed: true })
        .eq("id", order.id)
        .select()

      try {
        queryClient.setQueryData<Tables<"orders">[]>(
          ["profile-active-orders", profileAddress.toLowerCase()],
          (orders) => {
            if (!orders) return

            return orders.map((item) => {
              if (item.id === order.id) {
                return {
                  ...item,
                  is_claimed: true,
                }
              }

              return item
            })
          },
        )
      } catch (err) {
        console.error(err)
      }

      await wait(1500)
      fireConfetti()
    } catch (err) {
      console.error(err)
    }

    setSubmitting(false)
  }

  return (
    <Button
      className="bg-brand cursor-pointer"
      isDisabled={isButtonDisabled}
      isLoading={isSubmitting}
      onClick={() => {
        claim()
      }}
    >
      Claim
    </Button>
  )
}

function SettleButton({
  order,
  isMyOrder,
}: {
  order: Tables<"orders">
  isMyOrder: boolean
}) {
  const { isFetching, roundId, targetTokenSettledPrice } = useOrderInfo(order)

  let isOrderWin: boolean | undefined

  if (targetTokenSettledPrice !== undefined) {
    if (order.direction === 0) {
      isOrderWin = order.target_price > targetTokenSettledPrice
    } else {
      isOrderWin = order.target_price < targetTokenSettledPrice
    }
  }

  if (isFetching) {
    return <div className="bone h-14 rounded-2xl"></div>
  }

  const isWin = isOrderWin && isMyOrder

  if (isWin) {
    return <ClaimButton order={order} roundId={roundId!} />
  }

  return <Button className="!cursor-default bg-red-100">Lost</Button>
}

function CancelButton({ order }: { order: Tables<"orders"> }) {
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()
  const [isSubmitting, setSubmitting] = useState(false)

  const cancel = async () => {
    try {
      setSubmitting(true)
    } catch (err) {
      console.error(err)
    }

    setSubmitting(false)
  }

  return (
    <Button className="bg-red-100" isLoading={false}>
      Cancel
    </Button>
  )
}

function Order({
  data,
  isMyOrder,
  isMyProfile,
}: {
  data: Tables<"orders">
  isMyOrder: boolean
  isMyProfile: boolean
}) {
  const isExpired = dayjs().isAfter(dayjs(data.expires_at * 1000))
  const isStaled = isExpired && !data.opponent
  const isCancelable = !isExpired && !data.opponent

  return (
    <div className="rounded-3xl border border-zinc-300 bg-white p-6 transition hover:border-zinc-400">
      <OrderInfo data={data} />
      {isMyProfile && (
        <div className="mt-6 h-14">
          {isCancelable ? (
            <CancelButton order={data} />
          ) : isExpired ? (
            isStaled ? (
              <Button className="!cursor-default bg-zinc-100">Staled</Button>
            ) : data.is_claimed ? (
              <Button className="bg-brand/30 !cursor-default">Claimed</Button>
            ) : (
              <SettleButton order={data} isMyOrder={isMyOrder} />
            )
          ) : (
            <Button className="!cursor-default bg-blue-200">Pending</Button>
          )}
        </div>
      )}
    </div>
  )
}

const useForeignOrders = (address: string) => {
  const queryFn = async () => {
    const res = await supabase
      .from("orders")
      .select("*")
      .eq("opponent", address.toLowerCase())
      .returns<Tables<"orders">[]>()

    return res.data
  }

  return useQuery({
    queryKey: ["profile-active-orders", address],
    queryFn,
  })
}

const useCreatedOrders = (address: string) => {
  const queryFn = async () => {
    const res = await supabase
      .from("orders")
      .select("*")
      .eq("owner", address.toLowerCase())
      .returns<Tables<"orders">[]>()

    return res.data
  }

  return useQuery({
    queryKey: ["profile-created-orders", address],
    queryFn,
  })
}

export default function Orders() {
  const params = useParams()
  const account = useEncAccount()

  const address = (params.address as string).toLowerCase()
  const isMyProfile = account.address?.toLowerCase() === address

  const profileOrdersQuery = useCreatedOrders(address)
  const foreignOrdersQuery = useForeignOrders(address)

  const isFetching =
    profileOrdersQuery.isFetching || foreignOrdersQuery.isFetching

  const orders = [
    ...(profileOrdersQuery.data || []),
    ...(foreignOrdersQuery.data || []),
  ]

  const activeDeals: Tables<"orders">[] = []
  const openedOrders: Tables<"orders">[] = []

  orders.forEach((order) => {
    if (order.opponent) {
      activeDeals.push(order)
    } else {
      openedOrders.push(order)
    }
  })

  return (
    <div className="pb-10 pr-5">
      {!!activeDeals?.length && (
        <div className="mb-10">
          <div className="text-3xl font-semibold">Active Deals</div>
          <div className="mt-1 text-lg">
            Transactions in which I take part: those that I created and those in
            which I decided to put “against”.
          </div>
          <div className="mt-6 grid gap-3 pb-10 md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-6">
            {activeDeals.map((item, index) => {
              const isMyOrder =
                item.owner.toLowerCase() === account.address?.toLowerCase()

              return (
                <Order
                  key={index}
                  data={item}
                  isMyOrder={isMyOrder}
                  isMyProfile={isMyProfile}
                />
              )
            })}
          </div>
        </div>
      )}
      <div className="mb-6 text-3xl font-semibold">Opened Orders</div>
      {!isFetching && !openedOrders.length ? (
        <div className="flex h-[400px] items-center justify-center rounded-3xl bg-zinc-100">
          <div className="text-2xl opacity-60">Nothing to show</div>
        </div>
      ) : (
        <div className="grid gap-3 pb-10 md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-6">
          {isFetching
            ? new Array(6).fill(null).map((_, index) => {
                return (
                  <div key={index} className="bone h-[280px] rounded-3xl" />
                )
              })
            : openedOrders.map((item, index) => {
                const isMyOrder =
                  item.owner.toLowerCase() === account.address?.toLowerCase()

                return (
                  <Order
                    key={index}
                    data={item}
                    isMyOrder={isMyOrder}
                    isMyProfile={isMyProfile}
                  />
                )
              })}
        </div>
      )}
    </div>
  )
}
