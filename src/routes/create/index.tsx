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

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

const TARGET_TOKENS = ["BTC", "ETH"]
const BET_TOKENS = ["USDC", "USDT"]
const DIRECTIONS = ["above", "below"]
const DURATIONS = ["3 min", "3 days", "1 week"]

const DATA_SOURCES = [
  { name: "CHAINLINK", sourceId: 1 },
  { name: "PYTH", sourceId: 2 },
]

const getNonce = (() => {
  let initial = Date.now()
  return () => ++initial
})()

function Selector({ children }: any) {
  return (
    <div className="group relative inline-flex cursor-pointer">
      <div className="bg-brand relative z-[2] rounded-xl p-3">{children}</div>
      <div className="border-brand absolute inset-1 z-[1] rounded-2xl border-2 opacity-0 transition-all group-hover:-inset-1 group-hover:opacity-100"></div>
    </div>
  )
}

function Selector2({
  items,
  selected,
  onChange,
}: {
  items: string[]
  selected: string
  onChange(value: any): void
}) {
  return (
    <Listbox value={selected} onChange={onChange}>
      <ListboxButton>
        <Selector>{selected}</Selector>
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
              className="cursor-pointer rounded-xl bg-zinc-100 p-3 text-2xl shadow data-[focus]:bg-blue-100"
            >
              {item}
            </ListboxOption>
          ))}
      </ListboxOptions>
    </Listbox>
  )
}

export default function Create() {
  const account = useAccount()
  const chains = useChains()
  const chainId = useChainId()
  const { signTypedDataAsync } = useSignTypedData()

  const chain = chains.find((chain) => {
    return chain.id === chainId
  })!

  const [betAmount, setBetAmount] = useState(100)
  const [dataSource, setDataSource] = useState(DATA_SOURCES[0])
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
      const direction = 1
      const entryPrice = 92000
      const targetPrice = 100000
      const betAmount = 1000
      const rawBetAmount = parseUnits(
        betAmount.toFixed(betToken.decimals),
        betToken.decimals,
      )
      const deadline = dayjs.utc().add(1, "days")
      const expiresAt = dayjs.utc().add(7, "days")
      // TODO rewrite to safety variant
      const targetTokenId = TARGET_TOKENS.indexOf(targetTokenTicker) + 1

      const signature = await signTypedDataAsync({
        domain: {
          name: "TradeEntry",
          version: "1",
          chainId,
          verifyingContract: ZERO_ADDRESS,
        },
        types: {
          OrderParams: [
            { name: "depositAsset", type: "address" },
            { name: "initiator", type: "address" },
            { name: "initiatorAmount", type: "uint256" },
            { name: "acceptor", type: "address" },
            { name: "acceptorAmount", type: "uint256" },
            { name: "acceptionDeadline", type: "uint256" },
            { name: "expiry", type: "uint256" },
            { name: "observationAsset", type: "uint32" },
            { name: "direction", type: "uint8" },
            { name: "price", type: "uint256" },
            { name: "dataSourceId", type: "uint8" },
            { name: "nonce", type: "uint256" },
          ],
        },
        primaryType: "OrderParams",
        message: {
          depositAsset: betToken.address,
          initiator: account.address!,
          initiatorAmount: rawBetAmount,
          acceptor: ZERO_ADDRESS,
          acceptorAmount: rawBetAmount,
          acceptionDeadline: BigInt(String(deadline.unix())),
          expiry: BigInt(String(expiresAt.unix())),
          observationAsset: targetTokenId,
          direction,
          price: parseUnits(String(targetPrice), 18),
          dataSourceId: dataSource.sourceId,
          nonce: BigInt(nonce),
        },
      })

      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            chain_id: chainId,
            bet_amount: rawBetAmount.toString(),
            direction,
            entry_price: entryPrice,
            target_price: targetPrice,
            deadline: deadline.toISOString(),
            expires_at: expiresAt.toISOString(),
            owner: account.address!.toLowerCase(),
            owner_signature: signature,
            target_ticker: targetTokenTicker.toLowerCase(),
            source_ticker: betTokenTicker.toLowerCase(),
            nonce,
          },
        ])
        .select()
    } catch (err) {
      console.error(err)
    }

    setSubmitting(false)
  }

  return (
    <div className="mx-auto">
      <div className="relative flex h-[calc(100vh-136px)] flex-col items-center justify-center">
        <div className="flex items-center gap-3 text-3xl">
          <div className="flex items-center gap-3">
            <div>I bet</div>
            <div className="pt-9">
              <div className="rounded-2xl bg-zinc-50 p-1.5">
                <div className="relative z-[2] flex items-center gap-1.5">
                  <div className="bg-brand rounded-xl p-3 shadow">
                    {betAmount}
                  </div>
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
            />
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
        <div className="relative mt-20 flex items-center gap-6">
          <div
            className={cx(
              "flex h-14 cursor-pointer select-none items-center justify-center rounded-2xl bg-black px-8 shadow-xl transition",
              {
                "!cursor-not-allowed opacity-20": isApproveDisabled,
                "!cursor-default": isApproving,
              },
            )}
            onClick={approve}
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
            <div className="text-center text-xl font-medium text-white">
              2. Submit the Order
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
