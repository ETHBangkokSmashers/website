import {
  sepolia,
  polygonAmoy,
  arbitrumSepolia,
  baseSepolia,
  celoAlfajores,
  scrollSepolia,
  hederaTestnet,
  flowTestnet,
  mantleTestnet,
  neonDevnet,
  linea,

  // mainnet,
  // polygon,
  // bitkub,
  // kinto,
  // worldchain,
  // arbitrum,
  // scroll,
  // mantle,
  // gnosis,
  // hedera,
  // celo,
  // base,
  // zircuit,
} from "viem/chains"

import { chainConfig } from "@/helpers/chainConfig"
import { shortenAddress } from "@/helpers/shortenAddress"

const chains = [
  {
    title: "linea",
    contractAddress: chainConfig[linea.id].tradeEntryAddress,
    scanEndpoint: "https://lineascan.build/",
  },
  {
    title: "celo",
    contractAddress: chainConfig[arbitrumSepolia.id].tradeEntryAddress,
    scanEndpoint: "https://celo-alfajores.blockscout.com/",
  },
  {
    title: "hedera",
    contractAddress: chainConfig[arbitrumSepolia.id].tradeEntryAddress,
    scanEndpoint: "https://hashscan.io/testnet/",
  },
  {
    title: "neon",
    contractAddress: chainConfig[arbitrumSepolia.id].tradeEntryAddress,
    scanEndpoint: "https://neon-devnet.blockscout.com/",
  },
  {
    title: "arbitrum",
    contractAddress: chainConfig[arbitrumSepolia.id].tradeEntryAddress,
    scanEndpoint: "https://sepolia.arbiscan.io/",
  },
  {
    title: "base",
    contractAddress: chainConfig[baseSepolia.id].tradeEntryAddress,
    scanEndpoint: "https://sepolia.basescan.org/",
  },
  {
    title: "flow",
    contractAddress: chainConfig[flowTestnet.id].tradeEntryAddress,
    scanEndpoint: "https://evm-testnet.flowscan.io/",
  },
  {
    title: "mantle",
    contractAddress: chainConfig[mantleTestnet.id].tradeEntryAddress,
    scanEndpoint: "https://sepolia.mantlescan.xyz/",
  },
  {
    title: "polygon",
    contractAddress: chainConfig[polygonAmoy.id].tradeEntryAddress,
    scanEndpoint: "https://www.oklink.com/amoy/",
  },
  {
    title: "scroll",
    contractAddress: chainConfig[scrollSepolia.id].tradeEntryAddress,
    scanEndpoint: "https://sepolia.scrollscan.com/",
  },
  {
    title: "sepolia",
    contractAddress: chainConfig[sepolia.id].tradeEntryAddress,
    scanEndpoint: "https://sepolia.etherscan.io/",
  },
]

export default function Footer() {
  return (
    <div className="mt-24">
      <div className="mb-8 text-center text-4xl font-medium">
        "The path of decentralization is the only true path" (с)
      </div>
      <div className="grid grid-cols-3 gap-2 px-5 pb-5">
        {chains.map(({ title, contractAddress, scanEndpoint }) => {
          return (
            <a
              className="flex items-center rounded-xl bg-zinc-100 p-3 transition hover:bg-zinc-200"
              href={`${scanEndpoint}address/${contractAddress}`}
              target="_blank"
            >
              <img
                className="mr-3 size-6"
                src={`/images/${title}.svg`}
                alt=""
              />
              <div className="mr-3 text-xl font-medium">{title}</div>
              <div className="text-black/50">
                {shortenAddress(contractAddress as any, 10, 10)}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
