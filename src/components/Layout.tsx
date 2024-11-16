import React from "react"
import { Outlet, Link } from "react-router-dom"
import { DynamicWidget } from "@dynamic-labs/sdk-react-core"
import { useEncAccount } from "@/hooks/useFullAccount"

export default function Layout() {
  const { address, ensName, ensAvatar } = useEncAccount()

  return (
    <>
      <div className="flex items-center px-5 py-2">
        <Link className="mr-auto py-2 text-xl font-medium" to="/">
          JellyBean
        </Link>
        {!!address && (
          <div className="flex items-center gap-10">
            <Link className="" to={`/create`}>
              Create New Order
            </Link>
            <Link className="" to={`/profile/${address}`}>
              My Orders
            </Link>
          </div>
        )}
        <div className="ml-10 flex items-center">
          {ensName}
          {ensAvatar}
          <DynamicWidget />
        </div>
      </div>
      <Outlet />
    </>
  )
}
