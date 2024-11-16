import { useAccount, useEnsName, useEnsAvatar } from "wagmi"
import { normalize } from "viem/ens"

export function useEncAccount() {
  const account = useAccount()

  const ensName = useEnsName({
    address: account.address,
  })

  const ensAvatar = useEnsAvatar({
    assetGatewayUrls: {
      ipfs: "https://cloudflare-ipfs.com",
    },
    name: ensName.data ? normalize(ensName.data) : undefined,
  })

  return {
    isFetching: ensName.isFetching || ensAvatar.isFetching,
    address: account.address,
    ensName: ensName.data,
    ensAvatar: ensAvatar.data,
  }
}
