import { apiClient } from './client'
import type {
  Round,
  RoundDetails,
  RoundsResponse,
  RoundStatus,
  TapResponse,
} from '@/types/api'

interface GetRoundsParams {
  cursor?: string
  limit?: number
  status?: RoundStatus
}

export const roundsApi = {
  getAll(params?: GetRoundsParams) {
    const searchParams = new URLSearchParams()
    if (params?.cursor) searchParams.set('cursor', params.cursor)
    if (params?.limit) searchParams.set('limit', String(params.limit))
    if (params?.status) searchParams.set('status', params.status)

    const query = searchParams.toString()
    return apiClient.get<RoundsResponse>(`/rounds${query ? `?${query}` : ''}`)
  },

  getById(id: string) {
    return apiClient.get<RoundDetails>(`/rounds/${id}`)
  },

  create() {
    return apiClient.post<Round>('/rounds')
  },

  tap(id: string) {
    return apiClient.post<TapResponse>(`/rounds/${id}/tap`)
  },
}
