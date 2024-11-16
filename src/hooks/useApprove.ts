import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
  usePublicClient,
} from "wagmi"
import { erc20ABI } from "@/helpers/erc20ABI"
import { useRef, useState } from "react"
import { parseUnits } from "viem"

const MAX_UINT_256 = parseUnits("340282366920938463463", 0)

export const useApprove = ({
  tokenAddress,
  contractAddress,
  requiredAmount,
}: {
  tokenAddress: `0x${string}` | undefined
  contractAddress: `0x${string}`
  requiredAmount: bigint | undefined
}) => {
  const account = useAccount()
  const chainId = useChainId()
  const publicClient = usePublicClient()

  const [isApproving, setApproving] = useState(false)

  const allowanceTx = useReadContract({
    chainId,
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account.address!, contractAddress],
    query: {
      enabled: !!account.address,
    },
  })

  const allowanceRef = useRef<bigint | undefined>()

  if (allowanceRef.current === undefined && allowanceTx.data !== undefined) {
    allowanceRef.current = allowanceTx.data
  }

  const { writeContractAsync } = useWriteContract()

  const isApproveRequired =
    !!tokenAddress &&
    !!requiredAmount &&
    allowanceTx.data !== undefined &&
    allowanceTx.data < requiredAmount

  const approve = async () => {
    if (
      !publicClient ||
      !account.isConnected ||
      !tokenAddress ||
      allowanceTx.data === undefined ||
      !isApproveRequired ||
      isApproving
    ) {
      return
    }

    try {
      setApproving(true)

      const txHash = await writeContractAsync({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: "approve",
        args: [contractAddress, MAX_UINT_256],
      })

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })

      await allowanceTx.refetch()
    } catch (err) {
      console.error(err)
    }

    setApproving(false)
  }

  return {
    allowanceTx,
    isApproveRequired,
    approve,
    isApproving,
  }
}
