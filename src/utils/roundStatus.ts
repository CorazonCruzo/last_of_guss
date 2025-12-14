import type { Round, RoundStatus } from '@/types/api';

export function getRoundStatus(round: Round): RoundStatus {
  const now = Date.now();
  const start = new Date(round.startTime).getTime();
  const end = new Date(round.endTime).getTime();

  if (now < start) return 'cooldown';
  if (now >= start && now < end) return 'active';
  return 'finished';
}
