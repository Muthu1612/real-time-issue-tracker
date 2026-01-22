import { Issue } from '../types';
import IssueCard from './IssueCard';
import Card from '@/components/Card';

interface LatestIssuesProps {
  issues: Issue[];
}

export default function LatestIssues({ issues }: LatestIssuesProps) {
  return (
    <Card title="Latest Issues">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {issues.slice(0, 6).map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </Card>
  );
}
