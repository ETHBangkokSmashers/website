import { useConnect, useAccount } from "wagmi"
import { Link } from "react-router-dom"
import Avatar from "boring-avatars"
import { useQuery } from "@tanstack/react-query"
import supabase, { Tables } from "@/helpers/supabase"

function Item() {
  const address = "0x1"

  return (
    <div className="rounded-3xl border border-zinc-300 bg-white p-6 transition hover:border-zinc-400">
      <div className="mb-6 flex items-center">
        <Link to={`/profile/${address}`}>
          <Avatar
            className="mr-2 size-7"
            name="Margaret Brent"
            variant="beam"
          />
        </Link>
        <Link
          className="border-black hover:underline"
          to={`/profile/${address}`}
        >
          <b className="mr-2">CatZilla</b>
        </Link>{" "}
        bets that
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
      <div
        className="bg-brand mt-6 flex h-14 cursor-pointer select-none items-center justify-center rounded-2xl px-4 transition"
        // onClick={() => {
        //   if (!account.isConnected) {
        //     connect({ connector: connectors[0] })
        //   }
        // }}
      >
        <div className="text-center text-lg font-medium">
          Bet <b>$100</b> against
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()

  const queryFn = async () => {
    const res = await supabase
      .from("orders")
      .select()
      .returns<Tables<"orders">>()

    return res.data
  }

  const query = useQuery({ queryKey: ["orders"], queryFn })

  console.log(444, query)

  return (
    <div className="px-3">
      <div className="flex items-center justify-center">
        <div className="max-w-[700px] py-14 text-center text-6xl font-semibold">
          Turn ordinary products into exclusive digital experiences
        </div>
      </div>
      <div className="mx-auto max-w-[1024px]">
        <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {new Array(10).fill(null).map((_, index) => {
            return <Item key={index} />
          })}
        </div>
      </div>
    </div>
  )
}
