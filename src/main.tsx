import "./index.css"

import React from "react"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import utc from "dayjs/plugin/utc"
import relativeTime from "dayjs/plugin/relativeTime"
import ReactDOM from "react-dom/client"
import { WagmiProvider } from "@/contexts"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import Layout from "@/components/Layout"
import HomePage from "@/routes/home"

dayjs.extend(utc)
dayjs.extend(relativeTime)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiProvider>
    <RouterProvider router={router} />
  </WagmiProvider>,
)
