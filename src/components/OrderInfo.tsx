import Avatar from "boring-avatars"
import { Link } from "react-router-dom"
import { generateUsername } from "@/helpers/generateUsername"
import dayjs from "dayjs"
import { Tables } from "@/helpers/supabase.types"

export default function OrderInfo({ data }: { data: Tables<"orders"> }) {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Link to={`/profile/${data.owner}`}>
          <Avatar className="mr-2 size-7" name={data.owner} variant="beam" />
        </Link>
        <Link
          className="mr-1 font-semibold hover:underline"
          to={`/profile/${data.owner}`}
        >
          {generateUsername(data.owner)}
        </Link>{" "}
        bets that
      </div>
      <div className="text-3xl">
        <span className="font-semibold">BTC</span> will hit{" "}
        <span className="font-semibold">
          ${data.target_price.toLocaleString()}
        </span>
        <br />
        in {dayjs(data.expires_at * 1000).diff(dayjs(), "days")} days
      </div>
      <div className="mt-6">
        Current BTC price: <span className="font-semibold">$97,000</span>{" "}
        <span className="font-semibold text-red-400">-$3,000</span>
      </div>
      <div className="mt-6">
        Created:{" "}
        <span className="font-semibold">
          {dayjs(data.created_at).format("MMM DD YYYY HH:mm")}
        </span>
      </div>
      <div className="mt-2">
        Ends:{" "}
        <span className="font-semibold">
          {dayjs(data.expires_at * 1000).format("MMM DD YYYY HH:mm")}
        </span>
      </div>
    </>
  )
}
