import "./index.css"

import React from "react"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import utc from "dayjs/plugin/utc"
import relativeTime from "dayjs/plugin/relativeTime"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector"
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core"
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"
import { WagmiProvider, createConfig } from "wagmi"
import {
  mainnet,
  polygon,
  // flow,
  bitkub,
  kinto,
  worldchain,
  arbitrum,
  scroll,
  mantle,
  gnosis,
  hedera,
  celo,
  base,
  zircuit,
  linea,
} from "viem/chains"
import { http } from "viem"

import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"

import Layout from "@/components/Layout"
import HomePage from "@/routes/home"
import ProfilePage from "@/routes/profile"
import CreatePage from "@/routes/create"

dayjs.extend(utc)
dayjs.extend(relativeTime)

const config = createConfig({
  multiInjectedProviderDiscovery: false,
  chains: [
    mainnet,
    polygon,
    // flow,
    bitkub,
    kinto,
    worldchain,
    arbitrum,
    scroll,
    mantle,
    gnosis,
    hedera,
    celo,
    base,
    zircuit,
    linea,
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    // [flow.id]: http(),
    [bitkub.id]: http(),
    [kinto.id]: http(),
    [worldchain.id]: http(),
    [arbitrum.id]: http(),
    [scroll.id]: http(),
    [mantle.id]: http(),
    [gnosis.id]: http(),
    [hedera.id]: http(),
    [celo.id]: http(),
    [base.id]: http(),
    [zircuit.id]: http(),
    [linea.id]: http(),
  },
})

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/profile/:address" element={<ProfilePage />} />
      <Route path="/create" element={<CreatePage />} />
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DynamicContextProvider
    settings={{
      environmentId: "5a3a21a8-24d0-4f16-808c-cc9c43b6da03",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DynamicWagmiConnector>
          <RouterProvider router={router} />
        </DynamicWagmiConnector>
      </QueryClientProvider>
    </WagmiProvider>
  </DynamicContextProvider>,
)
