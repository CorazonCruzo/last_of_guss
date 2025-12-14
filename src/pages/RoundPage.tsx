import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout, Goose } from '@/components';
import { useRound, useTick, useUser } from '@/hooks';
import { getRoundStatus, formatCountdown } from '@/utils';
import { roundsApi } from '@/api';

export function RoundPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useRound(id!);
  const { isAdmin } = useUser();
  const [localScore, setLocalScore] = useState<number | null>(null);

  useTick(1000);

  if (isLoading) {
    return (
      <Layout title="ROUND" centered>
        <p className="text-xs">Loading...</p>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout title="ROUND" centered>
        <p className="text-xs text-red-500">Failed to load round</p>
        <Link to="/rounds" className="text-xs text-green-500 mt-4">
          Back to rounds
        </Link>
      </Layout>
    );
  }

  const { round, topStats, myStats } = data;
  const status = getRoundStatus(round);
  const displayScore = localScore ?? myStats.score;

  const winner = topStats.reduce<(typeof topStats)[0] | null>(
    (max, stat) => (!max || stat.score > max.score ? stat : max),
    null
  );

  const handleTap = async () => {
    if (status !== 'active' || isAdmin) return;

    setLocalScore((prev) => (prev ?? myStats.score) + 1);

    try {
      const result = await roundsApi.tap(round.id);
      setLocalScore(result.score);
    } catch {
      setLocalScore(null);
    }
  };

  const getTitleByStatus = () => {
    switch (status) {
      case 'cooldown':
        return 'Cooldown';
      case 'active':
        return 'Round Active!';
      case 'finished':
        return 'Round Finished';
    }
  };

  return (
    <Layout title={getTitleByStatus()} centered>
      <div className="flex flex-col items-center gap-6">
        <Goose onClick={handleTap} disabled={status !== 'active' || isAdmin} />

        {status === 'cooldown' && (
          <div className="text-center">
            <p className="text-xs text-orange-300">Cooldown</p>
            <p className="text-sm mt-2">
              Starts in: {formatCountdown(round.startTime)}
            </p>
          </div>
        )}

        {status === 'active' && (
          <div className="text-center">
            <p className="text-xs text-green-500">Round Active!</p>
            <p className="text-sm mt-2">
              Time left: {formatCountdown(round.endTime)}
            </p>
            {isAdmin ? (
              <div className="mt-4 space-y-1">
                <p className="text-xs">Total: {round.totalScore}</p>
                {winner && (
                  <p className="text-xs">
                    Leader: {winner.user.username} ({winner.score})
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm mt-2">My score: {displayScore}</p>
            )}
          </div>
        )}

        {status === 'finished' && (
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-400">Round Finished</p>
            <div className="border-t border-gray-600 pt-4 mt-4 space-y-1">
              <p className="text-xs">Total: {round.totalScore}</p>
              {winner && (
                <p className="text-xs">
                  Winner: {winner.user.username} ({winner.score})
                </p>
              )}
              {!isAdmin && (
                <p className="text-xs">My score: {myStats.score}</p>
              )}
            </div>
          </div>
        )}

        <Link to="/rounds" className="text-xs text-gray-400 hover:text-white mt-4">
          [Back to rounds]
        </Link>
      </div>
    </Layout>
  );
}
