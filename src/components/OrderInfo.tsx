import Avatar from "boring-avatars"
import { Link } from "react-router-dom"
import { generateUsername } from "@/helpers/generateUsername"
import dayjs from "dayjs"
import { Tables } from "@/helpers/supabase.types"
import { formatUnits } from "viem"
import { chainConfig } from "@/helpers/chainConfig"
import { useAccount } from "wagmi"

export default function OrderInfo({ data }: { data: Tables<"orders"> }) {
  const account = useAccount()

  const isMyOrder = account.address?.toLowerCase() === data.owner.toLowerCase()
  const isExpired = dayjs().isAfter(dayjs(data.expires_at * 1000))

  const betToken =
    chainConfig[data.chain_id].tokens[data.source_ticker.toLowerCase()]!

  const betAmount = +formatUnits(BigInt(data.bet_amount), betToken.decimals)

  return (
    <>
      <div className="mb-6 flex items-center text-xl">
        {isMyOrder ? (
          <div className="font-light">
            You bet <span className="font-medium">${betAmount}</span> that
          </div>
        ) : (
          <>
            <Link to={`/profile/${data.owner}`}>
              <Avatar
                className="mr-2 size-7"
                name={data.owner}
                variant="beam"
              />
            </Link>
            <Link
              className="mr-1 font-semibold hover:underline"
              to={`/profile/${data.owner}`}
            >
              {generateUsername(data.owner)}
            </Link>{" "}
            <span className="font-light">
              bets <span className="font-semibold">${betAmount}</span> that
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2 text-3xl font-light">
        <div className="inline-flex items-center">
          <img
            className="mr-2 size-7 flex-none"
            src={`/images/${data.target_ticker.toLowerCase()}.svg`}
            alt=""
          />
          <span className="font-medium">
            {data.target_ticker.toUpperCase()}
          </span>
        </div>{" "}
        <div>will be</div>
        <div className="font-medium">
          {data.direction === 0 ? "<" : ">"} $
          {data.target_price.toLocaleString()}
        </div>
        {!isExpired && (
          <>
            <br />
            in {dayjs(data.expires_at * 1000).diff(dayjs(), "days")} days
          </>
        )}
      </div>
      {/*<div className="mt-6">*/}
      {/*  Current BTC price: <span className="font-semibold">$97,000</span>{" "}*/}
      {/*  <span className="font-semibold text-red-400">-$3,000</span>*/}
      {/*</div>*/}
      <div className="mt-6 font-light">
        <span className="opacity-70">Created:</span>{" "}
        <span className="font-medium">
          {dayjs(data.created_at).format("MMM DD YYYY HH:mm")}
        </span>
      </div>
      <div className="mt-2 font-light">
        <span className="opacity-70">Ends:</span>{" "}
        <span className="font-medium">
          {dayjs(data.expires_at * 1000).format("MMM DD YYYY HH:mm")}
        </span>
      </div>
    </>
  )
}
