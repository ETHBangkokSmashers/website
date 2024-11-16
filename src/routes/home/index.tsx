import { useAccount } from "wagmi"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import supabase, { Tables } from "@/helpers/supabase"
import Order from "@/routes/home/Order"

export default function Home() {
  const account = useAccount()

  const queryFn = async () => {
    const res = await supabase
      .from("orders")
      .select()
      .returns<Tables<"orders">[]>()

    return res.data
  }

  const query = useQuery({ queryKey: ["orders"], queryFn })

  return (
    <div className="px-5">
      <div className="flex flex-col items-center justify-center py-14">
        <div className="max-w-[700px] text-center text-6xl font-semibold">
          Turn ordinary products into exclusive digital experiences
        </div>
        <Link className="mt-8" to="/create">
          <div className="bg-brand flex h-16 cursor-pointer select-none items-center justify-center rounded-2xl px-8 shadow-xl transition">
            <div className="text-center text-xl font-medium">
              Create New Order
            </div>
          </div>
        </Link>
      </div>
      {!query.isFetching && !query.data?.length ? (
        <div className="">Nothing to show</div>
      ) : (
        <div className="grid gap-3 pb-10 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {query.isFetching
            ? new Array(6).fill(null).map((_, index) => {
                return (
                  <div key={index} className="bone h-[280px] rounded-3xl" />
                )
              })
            : query.data?.map((item, index) => {
                const isMy =
                  account.address?.toLowerCase() === item.owner.toLowerCase()

                return <Order key={index} data={item} isMy={isMy} />
              })}
        </div>
      )}
    </div>
  )
}
