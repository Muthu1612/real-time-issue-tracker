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
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg line-clamp-2">{issue.title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${statusColors[issue.status]}`}>
          {issue.status.replace('_', ' ')}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
        {issue.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
        <span>Type: {issue.type}</span>
        <Link href={`/issues/${issue.id}`} className="text-blue-600 hover:underline">
          View →
        </Link>
      </div>
    </div>
  );
}
