import { Tables } from "@/helpers/supabase.types"
import OrderInfo from "@/components/OrderInfo"
import AcceptOrderButton from "@/components/AcceptOrderButton"

export default function Order({
  data,
  isMy,
}: {
  data: Tables<"orders">
  isMy: boolean
}) {
  return (
    <div className="rounded-3xl border border-zinc-300 bg-white p-6 transition hover:border-zinc-400">
      <OrderInfo data={data} />
      <div className="mt-6">
        {isMy ? (
          <div className="flex h-14 cursor-default select-none items-center justify-center rounded-2xl bg-zinc-100 px-4 transition">
            <div className="text-center text-lg font-medium">
              It's your order
            </div>
          </div>
        ) : (
          <AcceptOrderButton order={data} />
        )}
      </div>
    </div>
  )
}
