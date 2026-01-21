import { getDashboardData } from '@/features/dashboard/services';
import LatestIssues from '@/features/issues/components/LatestIssues';
import StatusCard from '@/features/dashboard/components/StatusCard';

export default async function DashboardPage() {
  const { statusCounts, latestIssues } = await getDashboardData();

  return (
    <main className="p-8 space-y-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Issue status summary using StatusCard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatusCard label="Open" count={statusCounts.OPEN} color="red" />
        <StatusCard label="In Progress" count={statusCounts.IN_PROGRESS} color="yellow" />
        <StatusCard label="Closed" count={statusCounts.CLOSED} color="green" />
      </div>

      {/* Latest issues section */}
      <div className="mt-8">
        <LatestIssues issues={latestIssues} />
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
