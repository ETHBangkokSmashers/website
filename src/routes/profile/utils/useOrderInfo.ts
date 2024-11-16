import { useChainLinkOrderInfo } from "./useChainLinkOrderInfo"
import { usePythOrderInfo } from "./usePythOrderInfo"
import { Tables } from "@/helpers/supabase.types"
import { TARGET_TOKENS } from "@/routes/create"

export const useOrderInfo = (
  order: Tables<"orders">,
): {
  isFetching: boolean
  roundId: string | undefined
  targetTokenSettledPrice: number | undefined
  updateFee?: bigint | undefined
} => {
  // TODO rewrite to safety variant
  const targetTokenId =
    TARGET_TOKENS.map((ticker) => {
      return ticker.toLowerCase()
    }).indexOf(order.target_ticker) + 1

  console.log(444, targetTokenId)

  const chainId = order.chain_id
  const observationAssetId = targetTokenId
  const expiresAt = order.expires_at

  const chainLinkData = useChainLinkOrderInfo({
    chainId,
    observationAssetId,
    expiresAt,
    skip: order.data_source_id === 2,
  })

  const pythData = usePythOrderInfo({
    chainId,
    observationAssetId,
    expiresAt,
    skip: order.data_source_id === 1,
  })

  return order.data_source_id === 1 ? chainLinkData : pythData
}
