import { Issue } from '../types';
import IssueCard from './IssueCard';

interface LatestIssuesProps {
  issues: Issue[];
}

export default function LatestIssues({ issues }: LatestIssuesProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Latest Issues</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </section>
  );
}
