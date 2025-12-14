import { useState } from 'react';
import { Layout, RoundCard } from '@/components';
import { useRounds, useTick, useUser } from '@/hooks';
import { roundsApi } from '@/api';

export function RoundsPage() {
  const { data, isLoading, error, refetch } = useRounds();
  const { isAdmin } = useUser();
  const [isCreating, setIsCreating] = useState(false);

  // Re-render every second to update round statuses
  useTick(1000);

  const handleCreateRound = async () => {
    setIsCreating(true);
    try {
      await roundsApi.create();
      refetch();
    } catch (err) {
      console.error('Failed to create round:', err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Layout title="ROUNDS">
      <div className="w-full max-w-2xl mt-4">
        {isAdmin && (
          <div className="text-center mb-6">
            <button
              onClick={handleCreateRound}
              disabled={isCreating}
              className="bg-green-700 hover:bg-green-600 disabled:bg-gray-600 border-2 border-green-500 disabled:border-gray-500 px-4 py-2 text-xs transition-colors"
            >
              {isCreating ? 'Creating...' : 'Create Round'}
            </button>
          </div>
        )}

        {isLoading && (
          <p className="text-xs text-center">Loading rounds...</p>
        )}

        {error && (
          <p className="text-xs text-red-500 text-center">
            Error: {error instanceof Error ? error.message : 'Failed to load'}
          </p>
        )}

        {data && (
          <div className="space-y-4">
            {data.data.length === 0 ? (
              <p className="text-xs text-gray-400 text-center">No rounds available</p>
            ) : (
              data.data.map((round) => (
                <RoundCard key={round.id} round={round} />
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
