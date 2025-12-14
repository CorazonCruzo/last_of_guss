import { useQuery } from '@tanstack/react-query';
import { roundsApi } from '@/api';
import { getRoundStatus } from '@/utils';

export function useRounds() {
  return useQuery({
    queryKey: ['rounds'],
    queryFn: async () => {
      const response = await roundsApi.getAll();
      const filteredData = response.data.filter((round) => {
        const status = getRoundStatus(round);
        return status === 'active' || status === 'cooldown';
      });
      return { ...response, data: filteredData };
    },
    refetchInterval: 10000,
  });
}
