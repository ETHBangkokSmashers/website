import { useState } from "react"
import { useAccount, useChainId, useChains, useSignTypedData } from "wagmi"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { chainConfig } from "@/helpers/chainConfig"
import supabase from "@/helpers/supabase"
import { parseUnits } from "viem"
import dayjs from "dayjs"
import cx from "clsx"
import Spinner from "@/components/Spinner"
import { useApprove } from "@/hooks/useApprove"
import { fireConfetti } from "@/helpers/fireConfetti"
import { wait } from "@/helpers/wait"
import { useNavigate } from "react-router-dom"
import { CheckIcon, ChevronDown } from "lucide-react"

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const TARGET_TOKENS = ["BTC", "ETH"]
const BET_TOKENS = ["USDC", "USDT"]
const DIRECTIONS = [">", "<"]
const DURATIONS = ["3 min", "3 days", "1 week"]

const getNonce = (() => {
  let initial = Date.now()
  return () => ++initial
})()

function Selector({ children }: any) {
  return (
    <div className="hover:bg-brand group -mx-2 cursor-pointer rounded-2xl px-2 py-1 font-normal transition">
      <div className="border-b-2 border-dotted border-black border-opacity-50 transition group-hover:border-opacity-0">
        {children}
      </div>
    </div>
  )
}

function Selector2({
  children,
  items,
  selected,
  onChange,
}: {
  children?: any
  items: string[]
  selected: string
  onChange(value: any): void
}) {
  return (
    <Listbox value={selected} onChange={onChange}>
      <ListboxButton>
        {children || <Selector>{selected}</Selector>}
      </ListboxButton>
      <ListboxOptions
        className="mt-1 space-y-1 !overflow-visible"
        anchor="bottom"
      >
        {items
          .filter((item) => {
            return item !== selected
          })
          .map((item) => (
            <ListboxOption
              key={item}
              value={item}
              className="min-w-full cursor-pointer rounded-xl bg-zinc-100 px-5 py-3.5 text-xl shadow data-[focus]:bg-blue-100"
            >
              {item}
            </ListboxOption>
          ))}
      </ListboxOptions>
    </Listbox>
  )
}

function PriceFeedProviderCard({
  image,
  isActive,
  onClick,
}: {
  image: string
  isActive: boolean
  onClick(): void
}) {
  return (
    <div
      className={cx(
        "relative mt-5 flex h-20 items-center justify-center rounded-xl border-2 border-zinc-300 p-3 opacity-40 transition",
        {
          "cursor-default border-black !opacity-100": isActive,
          "cursor-pointer hover:opacity-100": !isActive,
        },
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "bg-brand absolute right-2 top-2 flex size-7 items-center justify-center rounded-full opacity-0 transition",
          {
            "opacity-100": isActive,
          },
        )}
      >
        <CheckIcon className="size-4.5" strokeWidth={3} />
      </div>
      <img className="h-12" src={image} alt="" />
    </div>
  )
}

function AdvancedSettings({
  priceFeedProviderId,
  onProviderChange,
}: {
  priceFeedProviderId: number
  onProviderChange(providerId: number): void
}) {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <div className="mt-8 flex justify-center">
      <div
        className={cx(
          "rounded-3xl bg-transparent px-8 py-5 transition-all duration-1000 ease-in-out",
          {
            "!bg-zinc-50": isExpanded,
          },
        )}
      >
        <div
          className={cx(
            "h-0 w-full max-w-[600px] overflow-hidden opacity-0 transition-all duration-1000",
            {
              "h-[230px] opacity-100": isExpanded,
            },
          )}
        >
          <div className="text-lg font-semibold lg:text-xl">
            Selected Price Feed Provider
          </div>
          <div className="grid grid-cols-2">
            <div className="">
              <div className="mt-5 space-y-1.5">
                <PriceFeedProviderCard
                  image="/images/chainlink.svg"
                  isActive={priceFeedProviderId === 1}
                  onClick={() => {
                    onProviderChange(1)
                  }}
                />
                <PriceFeedProviderCard
                  image="/images/pyth.svg"
                  isActive={priceFeedProviderId === 2}
                  onClick={() => {
                    onProviderChange(2)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="flex cursor-pointer items-center rounded-xl px-3 py-1.5 pl-3.5 transition hover:bg-zinc-100"
            onClick={() => {
              setExpanded((v) => !v)
            }}
          >
            <div className="">Advanced Settings</div>
            <ChevronDown
              className={cx("ml-2 size-4 transition duration-300", {
                "rotate-180": isExpanded,
              })}
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Create() {
  const navigate = useNavigate()
  const account = useAccount()
  const chains = useChains()
  const chainId = useChainId()
  const { signTypedDataAsync } = useSignTypedData()

  const chain = chains.find((chain) => {
    return chain.id === chainId
  })!

  const [betAmount, setBetAmount] = useState(100)
  const [priceFeedProviderId, setPriceFeedProviderId] = useState(2)
  const [direction, setDirection] = useState(DIRECTIONS[0])
  const [duration, setDuration] = useState(DURATIONS[0])
  const [targetTokenTicker, setTargetToken] = useState(TARGET_TOKENS[0])
  const [betTokenTicker, setBetToken] = useState(BET_TOKENS[0])
  const [isSubmitting, setSubmitting] = useState(false)

  const betToken = chainConfig[chainId].tokens[betTokenTicker.toLowerCase()]
  const contractAddress = chainConfig[chainId].tradeEntryAddress!

  const { allowanceTx, isApproveRequired, approve, isApproving } = useApprove({
    contractAddress,
    tokenAddress: betToken?.address,
    requiredAmount: betToken?.decimals
      ? parseUnits(`${betAmount}`, betToken?.decimals)
      : undefined,
  })

  const areButtonsDisabled =
    !betToken ||
    !account.isConnected ||
    allowanceTx.isFetching ||
    allowanceTx.data === undefined

  const isApproveDisabled = areButtonsDisabled || !isApproveRequired
  const isSubmitDisabled = areButtonsDisabled || isApproveRequired

  const submit = async () => {
    if (isSubmitDisabled) {
      return
    }

    try {
      setSubmitting(true)

      const nonce = getNonce()
      const directionNum = direction === "<" ? 0 : 1
      const entryPrice = 92000
      const targetPrice = 100000

      const rawBetAmount = parseUnits(
        betAmount.toFixed(betToken.decimals),
        betToken.decimals,
      )

      let expNum: number
      let expStr: string

      if (duration === "3 min") {
        expNum = 3
        expStr = "minutes"
      } else if (duration === "3 days") {
        expNum = 3
        expStr = "days"
      } else {
        expNum = 1
        expStr = "weeks"
      }

      const deadline = dayjs.utc().add(10, "days").unix()
      const expiresAt = dayjs
        .utc()
        .add(expNum, expStr as any)
        .unix()

      // TODO rewrite to safety variant
      const targetTokenId = TARGET_TOKENS.indexOf(targetTokenTicker) + 1

      const signature = await signTypedDataAsync({
        domain: {
          name: "TradeEntry",
          version: "1",
          chainId,
          verifyingContract: contractAddress,
        },
        types: {
          Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "verifyingContract", type: "address" },
          ],
          TradeParams: [
            { name: "depositAsset", type: "address" },
            { name: "initiator", type: "address" },
            { name: "initiatorAmount", type: "uint256" },
            { name: "acceptor", type: "address" },
            { name: "acceptorAmount", type: "uint256" },
            { name: "acceptionDeadline", type: "uint256" },
            { name: "expiry", type: "uint256" },
            { name: "observationAssetId", type: "uint32" },
            { name: "direction", type: "uint8" },
            { name: "price", type: "uint256" },
            { name: "dataSourceId", type: "uint8" },
            { name: "nonce", type: "uint256" },
          ],
        },
        primaryType: "TradeParams",
        message: {
          depositAsset: betToken.address,
          initiator: account.address!,
          initiatorAmount: rawBetAmount,
          acceptor: ZERO_ADDRESS,
          acceptorAmount: rawBetAmount,
          acceptionDeadline: BigInt(deadline),
          expiry: BigInt(expiresAt),
          observationAssetId: targetTokenId,
          direction: directionNum,
          price: parseUnits(String(targetPrice), 18),
          dataSourceId: priceFeedProviderId,
          nonce: BigInt(nonce),
        },
      })

      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            chain_id: chainId,
            bet_amount: rawBetAmount.toString(),
            direction: directionNum,
            entry_price: entryPrice,
            target_price: targetPrice,
            deadline,
            expires_at: expiresAt,
            owner: account.address!.toLowerCase(),
            owner_signature: signature,
            target_ticker: targetTokenTicker.toLowerCase(),
            source_ticker: betTokenTicker.toLowerCase(),
            data_source_id: priceFeedProviderId,
            tx_hash: null,
            nonce,
          },
        ])
        .select()

      await wait(1500)
      fireConfetti()
      navigate(`/profile/${account.address}`)
    } catch (err) {
      console.error(err)
    }

    setSubmitting(false)
  }

  return (
    <div className="mx-auto">
      <div className="relative flex flex-col items-center justify-center lg:h-[calc(100vh-136px)]">
        <div className="flex flex-col items-center gap-3 text-[40px] font-light leading-[44px] lg:flex-row">
          <div className="flex items-center gap-3">
            <div>I bet</div>
            <div className="pt-9">
              <div className="rounded-2xl bg-zinc-50 px-3 py-1.5">
                <div className="relative z-[2] flex items-center gap-1.5">
                  <Selector>{betAmount}</Selector>
                  <Selector2
                    items={BET_TOKENS}
                    selected={betTokenTicker}
                    onChange={setBetToken}
                  />
                </div>
                <div className="rounded-b-xl pb-0.5 pt-1.5 text-center text-base">
                  in {chain.name}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>that</div>
            <Selector2
              items={TARGET_TOKENS}
              selected={targetTokenTicker}
              onChange={setTargetToken}
            >
              <div className="hover:bg-brand group -mx-2 cursor-pointer rounded-2xl px-2 py-1 font-normal transition">
                <div className="flex items-center border-b-2 border-dotted border-black border-opacity-50 transition group-hover:border-opacity-0">
                  <img
                    className="mr-2 size-8 flex-none"
                    src={`/images/${targetTokenTicker.toLowerCase()}.svg`}
                    alt=""
                  />
                  <div className="">{targetTokenTicker.toUpperCase()}</div>
                </div>
              </div>
            </Selector2>
          </div>
          <div className="flex items-center gap-3">
            <div>will&nbsp;be</div>
            <Selector2
              items={DIRECTIONS}
              selected={direction}
              onChange={setDirection}
            />
            <Selector>$100,000</Selector>
          </div>
          <div className="flex items-center gap-3">
            <div>in</div>
            <Selector2
              items={DURATIONS}
              selected={duration}
              onChange={setDuration}
            />
          </div>
        </div>

        <AdvancedSettings
          priceFeedProviderId={priceFeedProviderId}
          onProviderChange={setPriceFeedProviderId}
        />

        <div className="relative mt-12 flex items-center gap-6">
          <div
            className={cx(
              "flex h-14 cursor-pointer select-none items-center justify-center rounded-2xl bg-black px-8 shadow-xl transition",
              {
                "!cursor-not-allowed opacity-20": isApproveDisabled,
                "!cursor-default": isApproving,
              },
            )}
            onClick={() => {
              approve()
            }}
          >
            {isApproving && (
              <Spinner className="fill-brand mr-4 size-6 text-white/30" />
            )}
            <div className="text-center text-xl font-medium text-white">
              1. Approve Spending
            </div>
          </div>
          <div
            className={cx(
              "flex h-14 cursor-pointer select-none items-center justify-center rounded-2xl bg-black px-8 shadow-xl transition",
              {
                "!cursor-not-allowed opacity-20": isSubmitDisabled,
              },
            )}
            onClick={submit}
          >
            {isSubmitting && (
              <Spinner className="fill-brand mr-4 size-6 text-white/30" />
            )}
            <div className="text-center text-xl font-medium text-white">
              2. Submit the Order
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
