import cx from "clsx"
import { useState } from "react"
import { useApprove } from "@/hooks/useApprove"
import { Tables } from "@/helpers/supabase.types"
import { chainConfig } from "@/helpers/chainConfig"
import { formatUnits, parseUnits } from "viem"
import Spinner from "@/components/Spinner"
import { useAccount, usePublicClient, useWriteContract } from "wagmi"
import tradeEntryABI from "@/helpers/tradeEntryABI"
import { ZERO_ADDRESS, TARGET_TOKENS } from "@/routes/create"
import { wait } from "@/helpers/wait"
import { fireConfetti } from "@/helpers/fireConfetti"
import { useNavigate } from "react-router-dom"
import supabase from "@/helpers/supabase"

export default function AcceptOrderButton({
  order,
}: {
  order: Tables<"orders">
}) {
  const account = useAccount()
  const publicClient = usePublicClient()
  const navigate = useNavigate()

  const betToken =
    chainConfig[order.chain_id].tokens[order.source_ticker.toLowerCase()]!

  const betAmount = +formatUnits(BigInt(order.bet_amount), betToken.decimals)
  const contractAddress = chainConfig[order.chain_id].tradeEntryAddress!

  const { allowanceTx, isApproveRequired, approve, isApproving } = useApprove({
    contractAddress,
    tokenAddress: betToken.address,
    requiredAmount: BigInt(order.bet_amount),
  })

  const { writeContractAsync } = useWriteContract()

  const [isSubmitting, setSubmitting] = useState(false)

  const isButtonDisabled =
    !publicClient || !account.address || allowanceTx.data === undefined

  const submit = async () => {
    if (isButtonDisabled || isSubmitting) {
      return
    }

    try {
      setSubmitting(true)

      const betToken =
        chainConfig[order.chain_id].tokens[order.source_ticker.toLowerCase()]!

      // TODO rewrite to safety variant
      const targetTokenId =
        TARGET_TOKENS.map((ticker) => {
          return ticker.toLowerCase()
        }).indexOf(order.target_ticker) + 1

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: tradeEntryABI,
        functionName: "startTrade",
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
          order.owner_signature as `0x${string}`,
        ],
      })

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })

      const { data, error } = await supabase
        .from("orders")
        .update({
          opponent: account.address!.toLowerCase(),
          tx_hash: txHash,
        })
        .eq("id", order.id)
        .select()

      await wait(1500)
      fireConfetti()
      navigate(`/profile/${account.address}`)
    } catch (err) {
      console.error(err)
    }

    setSubmitting(false)
  }

  const approveAndSubmit = async () => {
    await approve(submit)
  }

  return (
    <div
      className={cx(
        "bg-brand mt-6 flex h-14 cursor-pointer select-none items-center justify-center rounded-2xl px-4 transition",
        {
          "!cursor-not-allowed opacity-20": isButtonDisabled,
        },
      )}
      onClick={() => {
        if (isButtonDisabled) {
          return
        }

        if (isApproveRequired) {
          approveAndSubmit()
        } else {
          submit()
        }
      }}
    >
      {(isApproving || isSubmitting) && (
        <Spinner className="mr-4 size-6 fill-black text-black/20" />
      )}
      <div className="text-center text-xl font-light">
        {isApproveRequired ? (
          "Approve Spending"
        ) : (
          <>
            Bet{" "}
            <span className="font-semibold">${betAmount.toLocaleString()}</span>{" "}
            against
          </>
        )}
      </div>
    </div>
  )
}
