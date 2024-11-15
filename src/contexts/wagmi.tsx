import { http, createConfig, WagmiConfig } from "wagmi"
import { polygon } from "viem/chains"

const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http("https://polygon.llamarpc.com"),
  },
})

export const WagmiProvider: React.CFC = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
