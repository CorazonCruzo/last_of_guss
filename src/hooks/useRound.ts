import { useQuery } from '@tanstack/react-query';
import { roundsApi } from '@/api';

export function useRound(id: string) {
  return useQuery({
    queryKey: ['round', id],
    queryFn: () => roundsApi.getById(id),
    refetchInterval: 5000,
  });
}
