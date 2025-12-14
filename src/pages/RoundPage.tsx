import { useParams } from 'react-router-dom';
import { Layout } from '@/components';

export function RoundPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout title="ROUND" centered>
      <p className="text-xs">Round {id} - coming soon...</p>
    </Layout>
  );
}
