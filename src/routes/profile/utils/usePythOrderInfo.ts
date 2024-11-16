// Settle trade
import { chainConfig } from "@/helpers/chainConfig"
import { useReadContract } from "wagmi"
import tradeEntryABI from "@/helpers/tradeEntryABI"
import { useState, useEffect } from "react"
import axios from "axios"
import { readContract } from "@wagmi/core"
import { wagmiConfig } from "@/helpers/wagmiConfig"
import eacaAggregatorProxy from "@/helpers/eacaAggregatorProxy"
import { formatUnits } from "viem"
import pythABI from "@/helpers/pythABI"

const HERMES_API_BASE_ENDPOINT = "https://hermes.pyth.network/v2"

export const usePythOrderInfo = ({
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
  const [roundId, setRoundId] = useState<string>()
  const [updateFee, setUpdateFee] = useState<bigint>()
  const [targetTokenSettledPrice, setSettledPrice] = useState<number>()
  const [isFetching, setFetching] = useState(false)

  const fetch = async () => {
    setFetching(true)

    const contractAddress = chainConfig[chainId].tradeEntryAddress!

    const priceFeedId = await readContract(wagmiConfig, {
      chainId: chainId as any,
      address: contractAddress,
      abi: tradeEntryABI,
      functionName: "pythAssetFeedIds",
      args: [observationAssetId],
    })

    const url = `${HERMES_API_BASE_ENDPOINT}/updates/price/${expiresAt}?ids%5B%5D=${priceFeedId}`

    const result = await axios.get(url)

    const targetTokenSettledPrice = result.data.parsed[0].price.price

    // console.log("Price:", targetTokenSettledPrice)

    const roundId = "0x" + result.data.binary.data[0]

    // console.log("Round ID:", roundId)

    const pythAddress = await readContract(wagmiConfig, {
      chainId: chainId as any,
      address: contractAddress,
      abi: tradeEntryABI,
      functionName: "pyth",
    })

    const updateFee = await readContract(wagmiConfig, {
      chainId: chainId as any,
      address: pythAddress,
      abi: pythABI,
      functionName: "getUpdateFee",
      args: [[roundId as `0x${string}`]],
    })

    // console.log("Update fee:", updateFee)

    setRoundId(roundId)
    setUpdateFee(updateFee)
    setSettledPrice(+formatUnits(targetTokenSettledPrice, 8))
    setFetching(false)
  }

  useEffect(() => {
    if (!skip) {
      fetch()
    }
  }, [skip])

  return {
    isFetching,
    roundId,
    updateFee,
    targetTokenSettledPrice,
  }
}
