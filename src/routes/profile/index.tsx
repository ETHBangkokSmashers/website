import { useParams } from "react-router-dom"
import Avatar from "boring-avatars"
import { useEncAccount } from "@/hooks/useFullAccount"
import Orders from "@/routes/profile/Orders"
import { generateUsername } from "@/helpers/generateUsername"
import { CoinsIcon, HandshakeIcon } from "lucide-react"

export default function Profile() {
  const params = useParams()
  const address = (params.address as string).toLowerCase()

  const account = useEncAccount()
  const isMyProfile = account.address?.toLowerCase() === address

  return (
    <div className="grid grid-cols-[400px_auto] gap-16 px-5 pt-10">
      <div className="self-start rounded-3xl border border-zinc-200 p-3 shadow-lg">
        <div className="flex items-center p-5">
          <Avatar className="mr-6 size-[100px]" name={address} variant="beam" />
          <div className="text-2xl font-medium">
            {generateUsername(address)}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-zinc-100 p-4">
            <div className="flex items-center">
              <HandshakeIcon className="mr-2 size-5 flex-none" />
              <div className="whitespace-nowrap">Deals</div>
            </div>
            <div className="mt-4 text-3xl">15</div>
          </div>
          <div className="rounded-2xl bg-lime-200 p-4">
            <div className="flex items-center">
              <CoinsIcon className="mr-2 size-5 flex-none" />
              <div className="whitespace-nowrap">Profit</div>
            </div>
            <div className="mt-4 text-3xl">+$1,000</div>
          </div>
        </div>
      </div>
      <Orders />
    </div>
  )
}
