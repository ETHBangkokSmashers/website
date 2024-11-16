import { chainConfig } from "@/helpers/chainConfig"
import { useReadContract } from "wagmi"
import tradeEntryABI from "@/helpers/tradeEntryABI"
import eacaAggregatorProxy from "@/helpers/eacaAggregatorProxy"
import { useEffect, useState } from "react"
import { readContract } from "@wagmi/core"
import { wagmiConfig } from "@/helpers/wagmiConfig"
import { formatUnits, numberToHex, padHex } from "viem"

export const useChainLinkOrderInfo = ({
  chainId,
  observationAssetId,
  expiresAt,
  skip,
}: {
  chainId: number
  observationAssetId: number
  expiresAt: number
  skip: boolean
}) => {
  const contractAddress = chainConfig[chainId].tradeEntryAddress!

  const feedAddressTx = useReadContract({
    chainId,
    address: contractAddress,
    abi: tradeEntryABI,
    functionName: "chainlinkAssetPriceFeeds",
    args: [observationAssetId],
    query: {
      enabled: !skip,
    },
  })

  const feedTx = useReadContract({
    chainId,
    address: feedAddressTx.data,
    abi: eacaAggregatorProxy,
    functionName: "latestRoundData",
    query: {
      enabled: !!feedAddressTx.data,
    },
  })

  const [roundId, setRoundId] = useState<string>()
  const [targetTokenSettledPrice, setSettledPrice] = useState<number>()
  const [_isFetching, setFetching] = useState(false)

  const fetch = async () => {
    try {
      setFetching(true)

      // ATTN targetTokenPrice has 8 decimals!
      let [roundId, targetTokenSettledPrice, , timestamp] = feedTx.data!

      while (timestamp > expiresAt) {
        roundId--
        ;[, targetTokenSettledPrice, , timestamp] = await readContract(
          wagmiConfig,
          {
            chainId: chainId as any,
            address: feedAddressTx.data!,
            abi: eacaAggregatorProxy,
            functionName: "getRoundData",
            args: [roundId],
          },
        )
      }

      if (roundId) {
        const hexString = numberToHex(roundId)
        const roundHex = padHex(hexString, { size: 32 })

        setRoundId(roundHex)
      }

      if (targetTokenSettledPrice) {
        setSettledPrice(+formatUnits(targetTokenSettledPrice, 8))
      }
    } catch (err) {
      console.error(err)
    }

    setFetching(false)
  }

  useEffect(() => {
    if (feedTx.data && !targetTokenSettledPrice) {
      fetch()
    }
  }, [!!feedTx.data])

  return {
    isFetching: feedAddressTx.isFetching || feedTx.isFetching || _isFetching,
    roundId,
    targetTokenSettledPrice,
  }
}
