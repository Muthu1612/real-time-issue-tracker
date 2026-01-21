import { getLatestIssues } from '@/features/issues/services';
import LatestIssues from '@/features/issues/components/LatestIssues';
import { mockIssues } from '@/features/issues/mocks';

export default async function DashboardPage() {
  const issues = await getLatestIssues();

  // Count issues by status
  const statusCounts = {
    OPEN: issues.filter((i) => i.status === 'OPEN').length,
    IN_PROGRESS: issues.filter((i) => i.status === 'IN_PROGRESS').length,
    CLOSED: issues.filter((i) => i.status === 'CLOSED').length,
  };

  return (
    <main className="p-8 space-y-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Issue status summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg text-center">
          <h2 className="text-lg font-semibold">Open</h2>
          <p className="text-2xl font-bold text-red-600">{statusCounts.OPEN}</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <h2 className="text-lg font-semibold">In Progress</h2>
          <p className="text-2xl font-bold text-yellow-600">{statusCounts.IN_PROGRESS}</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <h2 className="text-lg font-semibold">Closed</h2>
          <p className="text-2xl font-bold text-green-600">{statusCounts.CLOSED}</p>
        </div>
      </div>

      {/* Latest issues */}
      <div className="mt-8">
        <LatestIssues issues={issues.slice(0, 6)} />
      </div>

      {/* Quick link to all issues */}
      <div className="mt-8">
        <a
          href="/issues"
          className="text-blue-600 hover:underline text-lg"
        >
          View All Issues →
        </a>
      </div>
    </main>
  );
}
