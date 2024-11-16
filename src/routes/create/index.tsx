import { useState } from "react"
import { useAccount, useChainId, useSignTypedData } from "wagmi"
import { tokensMap } from "@/helpers/chainConfig"
import supabase, { Tables } from "@/helpers/supabase"
import { parseUnits } from "viem"
import dayjs from "dayjs"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

const TARGET_TOKENS = [
  { name: "BTC", observationId: 1 },
  {
    name: "ETH",
    observationId: 2,
  },
]

const BET_TOKENS = ["USDC", "USDT"]

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
      <div className="absolute inset-1 z-[1] rounded-2xl border-2 border-black/15 opacity-0 transition-all group-hover:-inset-1 group-hover:opacity-100"></div>
    </div>
  )
}

export default function Create() {
  const account = useAccount()
  const chainId = useChainId()
  const { signTypedDataAsync } = useSignTypedData()

  const [dataSource, setDataSource] = useState(DATA_SOURCES[0])
  const [targetToken, setTargetToken] = useState(TARGET_TOKENS[0])
  const [betToken, setBetToken] = useState(BET_TOKENS[0])
  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!chainId || !account.address || isSubmitting) {
      return
    }

    const chainConfig = tokensMap[chainId]
    const token = chainConfig[betToken.toLowerCase()]

    if (!token) {
      return
    }

    try {
      const nonce = getNonce()
      const direction = 1
      const entryPrice = 92000
      const targetPrice = 100000
      const betAmount = 1000
      const rawBetAmount = parseUnits(
        betAmount.toFixed(token.decimals),
        token.decimals,
      )
      const deadline = dayjs.utc().add(1, "days")
      const expiresAt = dayjs.utc().add(7, "days")

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
          depositAsset: token.address,
          initiator: account.address,
          initiatorAmount: rawBetAmount,
          acceptor: ZERO_ADDRESS,
          acceptorAmount: rawBetAmount,
          acceptionDeadline: BigInt(String(deadline.unix())),
          expiry: BigInt(String(expiresAt.unix())),
          observationAsset: targetToken.observationId,
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
            owner: account.address,
            owner_signature: signature,
            token: token.address,
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
            <div className="pt-8">
              <div className="group relative inline-flex cursor-pointer">
                <div className="relative">
                  <div className="bg-brand relative z-[2] rounded-xl p-3 shadow">
                    1000 USDT
                  </div>
                  <div className="relative z-[1] -mt-2 rounded-b-xl bg-zinc-100 pb-1 pt-2.5 text-center text-base">
                    in Ethereum
                  </div>
                  <div className="absolute inset-1 z-[1] rounded-2xl border-2 border-black/15 opacity-0 transition-all group-hover:-inset-1 group-hover:opacity-100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>that</div>
            <Selector>BTC</Selector>
          </div>
          <div className="flex items-center gap-3">
            <div>will&nbsp;be</div>
            <Selector>above</Selector>
            <Selector>$100,000</Selector>
          </div>
          <div className="flex items-center gap-3">
            <div>in</div>
            <Selector>1 Week</Selector>
          </div>
        </div>
        <div
          className="mt-20 flex h-14 cursor-pointer select-none items-center justify-center rounded-2xl bg-black px-8 shadow-xl transition"
          onClick={submit}
        >
          <div className="text-center text-xl font-medium text-white">
            Submit the Order
          </div>
        </div>
      </div>
    </div>
  )
}
