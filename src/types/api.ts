export type UserRole = 'SURVIVOR' | 'NIKITA' | 'ADMIN'

export interface User {
  username: string
  role: UserRole
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse extends User {
  token: string
}

export type RoundStatus = 'active' | 'cooldown' | 'finished'

export interface Round {
  id: string
  startTime: string
  endTime: string
  totalScore: number
  createdAt: string
}

export interface RoundStats {
  taps: number
  score: number
  user: {
    username: string
  }
}

export interface MyStats {
  taps: number
  score: number
}

export interface RoundDetails {
  round: Round
  topStats: RoundStats[]
  myStats: MyStats
}

export interface RoundsResponse {
  data: Round[]
  pagination: {
    limit: number
    nextCursor: string | null
    hasMore: boolean
  }
}

export interface TapResponse {
  taps: number
  score: number
}

export interface ApiError {
  message: string
}
