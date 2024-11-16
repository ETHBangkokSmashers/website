import supabase, { Tables } from "@/helpers/supabase"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useEncAccount } from "@/hooks/useFullAccount"
import OrderInfo from "@/components/OrderInfo"

function Order({ data, isMy }: { data: Tables<"orders">; isMy: boolean }) {
  return (
    <div className="rounded-3xl border border-zinc-300 bg-white p-6 transition hover:border-zinc-400">
      <OrderInfo data={data} />
      {isMy && (
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

const useForeignOrders = (address: string) => {
  const queryFn = async () => {
    const res = await supabase
      .from("orders")
      .select("*")
      .eq("opponent", address.toLowerCase())
      .returns<Tables<"orders">[]>()

    return res.data
  }

  return useQuery({
    queryKey: ["profile-foreign-orders", address],
    queryFn,
  })
}

const useCreatedOrders = (address: string) => {
  const queryFn = async () => {
    const res = await supabase
      .from("orders")
      .select("*")
      .eq("owner", address.toLowerCase())
      .returns<Tables<"orders">[]>()

    return res.data
  }

  return useQuery({
    queryKey: ["profile-created-orders", address],
    queryFn,
  })
}

export default function Orders() {
  const params = useParams()
  const account = useEncAccount()

  const address = params.address as string
  const isMy = account.address === address

  const profileOrdersQuery = useCreatedOrders(address)
  const foreignOrdersQuery = useForeignOrders(address)

  const isFetching =
    profileOrdersQuery.isFetching || foreignOrdersQuery.isFetching

  const orders = [
    ...(profileOrdersQuery.data || []),
    ...(foreignOrdersQuery.data || []),
  ]

  const activeDeals: Tables<"orders">[] = []
  const openedOrders: Tables<"orders">[] = []

  orders.forEach((order) => {
    if (order.opponent) {
      activeDeals.push(order)
    } else {
      openedOrders.push(order)
    }
  })

  return (
    <div className="pb-10 pr-5">
      {!!activeDeals?.length && (
        <div className="mb-10">
          <div className="text-3xl font-semibold">Active Deals</div>
          <div className="mt-1 text-lg">
            Transactions in which I take part: those that I created and those in
            which I decided to put “against”.
          </div>
          <div className="mt-6 grid gap-3 pb-10 md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-6">
            {activeDeals.map((item, index) => {
              return <Order key={index} data={item} isMy={isMy} />
            })}
          </div>
        </div>
      )}
      <div className="mb-6 text-3xl font-semibold">Opened Orders</div>
      {!isFetching && !openedOrders.length ? (
        <div className="flex h-[400px] items-center justify-center rounded-3xl bg-zinc-100">
          <div className="text-2xl opacity-60">Nothing to show</div>
        </div>
      ) : (
        <div className="grid gap-3 pb-10 md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-6">
          {isFetching
            ? new Array(6).fill(null).map((_, index) => {
                return (
                  <div key={index} className="bone h-[280px] rounded-3xl" />
                )
              })
            : openedOrders.map((item, index) => {
                return <Order key={index} data={item} isMy={isMy} />
              })}
        </div>
      )}
    </div>
  )
}
