import React from "react"
import { Outlet, Link } from "react-router-dom"
import { DynamicWidget } from "@dynamic-labs/sdk-react-core"
import { useEncAccount } from "@/hooks/useFullAccount"

export default function Layout() {
  const { ensName, ensAvatar } = useEncAccount()

  return (
    <>
      <div className="mx-auto flex max-w-[1024px] items-center py-3">
        <Link className="mr-auto py-2 text-xl font-medium" to="/">
          JellyBean
        </Link>
        <div className="flex items-center">
          {ensName}
          {ensAvatar}
          <DynamicWidget />
        </div>
      </div>
      <Outlet />
    </>
  )
}
