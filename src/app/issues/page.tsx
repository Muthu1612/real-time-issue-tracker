import IssueTable from '@/features/issues/components/IssueTable';
import { getLatestIssues } from '@/features/issues/services';

export default async function IssuesPage() {
  const issues = await getLatestIssues();

  return (
    <main className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Issues</h1>
        <p className="text-gray-600">
          View and manage all reported issues
        </p>
      </div>

      <IssueTable issues={issues} />
    </main>
  );
}
