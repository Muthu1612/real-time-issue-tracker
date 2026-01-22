import IssueTable from '@/features/issues/components/IssueTable';
import { getLatestIssues } from '@/features/issues/services';
import Navigation from '@/components/Navigation';

export default async function IssuesPage() {
  const issues = await getLatestIssues();

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sapphire-400 to-cyan-400 bg-clip-text text-transparent">
            All Issues
          </h1>
          <p className="text-gray-400 text-lg">
            View and manage all reported issues
          </p>
        </div>

        <IssueTable issues={issues} />
      </main>
    </>
  );
}
