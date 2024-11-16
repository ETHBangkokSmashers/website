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
import { mainnet, polygon, optimism, base } from "viem/chains"
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

dayjs.extend(utc)
dayjs.extend(relativeTime)

const config = createConfig({
  multiInjectedProviderDiscovery: false,
  chains: [mainnet, polygon, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/profile/:address" element={<ProfilePage />} />
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
