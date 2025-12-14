import { Link } from 'react-router-dom';
import type { Round } from '@/types/api';
import { getRoundStatus, formatDateTime } from '@/utils';

interface RoundCardProps {
  round: Round;
}

const statusConfig = {
  active: {
    label: 'Active',
    textColor: 'text-green-500',
    borderColor: 'border-green-700',
    linkColor: 'text-green-500 hover:text-green-400',
  },
  cooldown: {
    label: 'Cooldown',
    textColor: 'text-orange-300',
    borderColor: 'border-orange-900',
    linkColor: 'text-orange-300 hover:text-orange-200',
  },
  finished: {
    label: 'Finished',
    textColor: 'text-gray-500',
    borderColor: 'border-gray-700',
    linkColor: 'text-gray-500 hover:text-gray-400',
  },
};

export function RoundCard({ round }: RoundCardProps) {
  const status = getRoundStatus(round);
  const config = statusConfig[status];

  return (
    <div className={`border-2 ${config.borderColor} p-4 bg-gray-800`}>
      <Link
        to={`/rounds/${round.id}`}
        className={`text-xs break-all ${config.linkColor}`}
      >
        Round ID: {round.id}
      </Link>

      <div className="mt-4 text-xs space-y-1 text-gray-300">
        <p>Start: {formatDateTime(round.startTime)}</p>
        <p>End: {formatDateTime(round.endTime)}</p>
      </div>

      <div className="mt-4 border-t border-gray-600 pt-4">
        <p className={`text-xs ${config.textColor}`}>
          Status: {config.label}
        </p>
      </div>
    </div>
  );
}
