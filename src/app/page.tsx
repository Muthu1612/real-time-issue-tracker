import LatestIssues from '@/features/issues/components/LatestIssues';
import { getLatestIssues } from '@/features/issues/services';

export default async function Home() {
  const issues = await getLatestIssues();

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Issue Tracker</h1>
      <LatestIssues issues={issues} />
    </main>
  );
}
