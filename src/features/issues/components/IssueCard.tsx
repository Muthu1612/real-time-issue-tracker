import Link from 'next/link';
import { Issue } from '../types';

interface IssueCardProps {
  issue: Issue;
}

const statusColors: Record<Issue['status'], string> = {
  OPEN: 'bg-red-100 text-red-700',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
  CLOSED: 'bg-green-100 text-green-700',
};

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-2 hover:shadow transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{issue.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${statusColors[issue.status]}`}
        >
          {issue.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2">
        {issue.description}
      </p>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Type: {issue.type}</span>
        <Link
          href={`/issues/${issue.id}`}
          className="text-blue-600 hover:underline"
        >
          View →
        </Link>
      </div>
    </div>
  );
}
