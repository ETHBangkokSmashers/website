import Avatar from "boring-avatars"
import { generateUsername } from "@/helpers/generateUsername"
import dayjs from "dayjs"
import { Tables } from "@/helpers/supabase.types"

export default function OrderInfo({ data }: { data: Tables<"orders"> }) {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Avatar className="mr-2 size-7" name={data.owner} variant="beam" />
        <span className="mr-1 font-semibold">
          {generateUsername(data.owner)}
        </span>{" "}
        bets that
      </div>
      <div className="text-xl">
        <b>BTC</b> will hit <b>${data.target_price.toLocaleString()}</b>
        <br />
        in {dayjs.utc(data.expires_at).diff(dayjs.utc(), "days")} days
      </div>
      <div className="mt-6">
        Current BTC price: <b>$97,000</b>{" "}
        <span className="text-red-400">-$3,000</span>
      </div>
      <div className="mt-6">
        Created:{" "}
        <span className="font-semibold">
          {dayjs.utc(data.created_at).format("MMM DD YYYY HH:mm")}
        </span>
      </div>
      <div className="mt-2">
        Ends:{" "}
        <span className="font-semibold">
          {dayjs.utc(data.expires_at).format("MMM DD YYYY HH:mm")}
        </span>
      </div>
    </>
  )
}
