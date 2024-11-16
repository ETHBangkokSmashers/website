import cx from "clsx"
import { useState } from "react"
import { useApprove } from "@/hooks/useApprove"
import { Tables } from "@/helpers/supabase.types"
import { chainConfig } from "@/helpers/chainConfig"

export default function AcceptOrderButton({
  order,
}: {
  order: Tables<"orders">
}) {
  const betToken =
    chainConfig[order.chain_id].tokens[order.source_ticker.toLowerCase()]

  const contractAddress = chainConfig[order.chain_id].tradeEntryAddress!

  const { allowanceTx, isApproveRequired, approve, isApproving } = useApprove({
    contractAddress,
    tokenAddress: betToken?.address,
    requiredAmount: BigInt(order.bet_amount),
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (isApproveRequired || isSubmitting) {
      return
    }

    try {
      setSubmitting(true)
    } catch (err) {
      console.error(err)
    }

    setSubmitting(false)
  }

  return (
    <div
      className={cx(
        "bg-brand mt-6 flex h-14 cursor-pointer select-none items-center justify-center rounded-2xl px-4 transition",
        {},
      )}
    >
      <div className="text-center text-lg font-medium">
        {isApproveRequired ? (
          "Approve Spending"
        ) : (
          <>
            Bet <b>${order.bet_amount.toLowerCase()}</b> against
          </>
        )}
      </div>
    </div>
  )
}
