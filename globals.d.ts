import { BetStatus, BetResult, ConditionStatus, QuestName } from "@/helpers"

declare global {
  declare module "*?url" {
    const contents: StaticImageData
    export = contents
  }

  declare namespace React {
    type CFC<P = {}> = FC<{ children?: ReactNode } & P>
  }

  type CoinsBalance = {
    balance: number
    speed: number
    startedAt: string
  }

  type Streak = {
    day: number
    claimedAt: string
    timesCompleted: number
  }

  type UserFromServer = {
    tgId: string
    username: string
    refCode: string
    coinsBalance: CoinsBalance
    streak: Streak | null
    createdAt: string
    isInvited: boolean
    isNew: boolean
  }

  type User = UserFromServer & {
    locale: string
  }

  type GameItem = {
    id: string
    gameId: string
    title: string
    startsAt: string
    sport: {
      name: string
      slug: string
    }
    league: {
      name: string
      country: {
        name: string
      }
    }
    participants: {
      image?: string
      name: string
    }[]
  }

  type Condition = {
    conditionId: string
    status: ConditionStatus
    wonOutcomeIds: string[]
    game: GameItem
  }

  type CartItem = {
    gameId: string
    conditionId: string
    outcomeId: string
    isLive: boolean
    customMarketName: string | undefined
    customSelectionName: string | undefined
  }

  type BetslipItem = {
    conditionId: string
    outcomeId: string
    status: ConditionStatus | undefined
    game: GameItem
    isLive: boolean
    customMarketName: string | undefined
    customSelectionName: string | undefined
  }

  type BetItemSelection = {
    gameId: string
    conditionId: string
    outcomeId: string
    odds: number
    status: ConditionStatus
    result: BetResult | null
  }

  type BetItem = {
    id: string
    tgId: string
    createdAt: string
    coinsAmount: number
    usdtAmount: number
    selections: BetItemSelection[]
    totalOdds: number
    potentialPayout: number
    status: BetStatus
    result: BetResult
    isClaimed: boolean
    _isJustClaimed: boolean // user fo UX
  }

  type CoinData = { id: number; x: number; y: number }

  type LeaderboardItem = {
    avatar: string | null
    username: string
    profit: number
    position: number
  }

  type Quest = {
    id: string
    name: QuestName
    reward: number
    isDaily: boolean
    completedAt: string | null
  }

  type QuestMeta = {
    icon: string
    title: any
    description: any
  }

  type Tournament = {
    id: number
    name: string
    prizePool: number
    winnerCount: number
    startsAt: string
    endsAt: string
    joinedAt: string | null
  }
}

export {}
