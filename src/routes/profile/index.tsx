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
    <div className="grid gap-16 px-5 pt-10 xl:grid-cols-[400px_auto]">
      <div className="flex self-start rounded-3xl border border-zinc-200 p-3 shadow-lg xl:flex-col">
        <div className="flex items-center p-5">
          <Avatar className="mr-6 size-[100px]" name={address} variant="beam" />
          <div className="text-2xl font-medium">
            {generateUsername(address)}
          </div>
        </div>
        <div className="ml-auto grid grid-cols-2 gap-2 xl:mt-4">
          <div className="rounded-2xl bg-zinc-100 p-4">
            <div className="flex items-center">
              <HandshakeIcon className="mr-3 size-6 flex-none" />
              <div className="whitespace-nowrap text-xl">Deals</div>
            </div>
            <div className="mt-4 text-3xl font-medium">15</div>
          </div>
          <div className="rounded-2xl bg-lime-200 p-4">
            <div className="flex items-center">
              <CoinsIcon className="mr-3 size-6 flex-none" />
              <div className="whitespace-nowrap text-xl">Profit</div>
            </div>
            <div className="mt-4 text-3xl font-medium">+$1,000</div>
          </div>
        </div>
      </div>
      <Orders />
    </div>
  )
}
