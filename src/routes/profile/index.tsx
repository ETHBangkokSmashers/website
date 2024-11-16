import { Link, useParams } from "react-router-dom"
import Avatar from "boring-avatars"
import { useEncAccount } from "@/hooks/useFullAccount"

function Order({ isMe }: { isMe: boolean }) {
  return (
    <div className="rounded-3xl border border-zinc-300 bg-white p-6 transition hover:border-zinc-400">
      <div className="mb-6 flex items-center">
        <Avatar className="mr-2 size-7" name="Margaret Brent" variant="beam" />
        <b className="mr-2">CatZilla</b> bets that
      </div>
      <div className="text-xl">
        <b>BTC</b> will hit <b>$100,000</b> in 7 days
      </div>
      <div className="mt-6">
        Current BTC price: <b>$97,000</b>{" "}
        <span className="text-red-400">-$3,000</span>
      </div>
      <div className="mt-2">
        Ends: <b>Nov 29, 2024</b>
      </div>
      {isMe && (
        <div
          className="mt-6 flex h-14 cursor-pointer items-center justify-center rounded-2xl bg-red-100 px-4 transition"
          // onClick={() => {
          //   if (!account.isConnected) {
          //     connect({ connector: connectors[0] })
          //   }
          // }}
        >
          <div className="text-center text-lg text-red-500">Cancel</div>
        </div>
      )}
    </div>
  )
}

export default function Profile() {
  const params = useParams()
  const address = params.address as string

  const account = useEncAccount()
  const isMe = account.address === address

  return (
    <div className="mx-auto max-w-[1024px]">
      <div className="flex items-center">
        <Avatar className="size-[100px]" name="Margaret Brent" variant="beam" />
      </div>
      <div className="">Orders</div>
      <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
        {new Array(5).fill(null).map((_, index) => {
          return <Order key={index} isMe={isMe} />
        })}
      </div>
    </div>
  )
}
