import Link from 'next/link';
import { Issue } from '../types';

interface IssueTableProps {
  issues: Issue[];
}

const statusStyles = {
  OPEN: 'bg-red-500/20 text-red-400',
  IN_PROGRESS: 'bg-sapphire-500/20 text-sapphire-400',
  CLOSED: 'bg-green-500/20 text-green-400',
};

const typeStyles = {
  BUG: 'text-red-300',
  FEATURE: 'text-purple-300',
  TASK: 'text-blue-300',
};

export default function IssueTable({ issues }: IssueTableProps) {
  return (
    <div className="overflow-x-auto border border-sapphire-800/30 rounded-2xl bg-gray-900/40 backdrop-blur-sm">
      <table className="min-w-full">
        <thead className="border-b border-sapphire-800/30">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Assigned To</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Created</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800">
          {issues.map((issue) => (
            <tr
              key={issue.id}
              className="hover:bg-sapphire-500/5 transition-colors"
            >
              <td className="px-6 py-4">
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-white hover:text-sapphire-400 transition-colors font-medium"
                >
                  {issue.title}
                </Link>
              </td>

              <td className="px-6 py-4">
                <span className={`font-medium ${typeStyles[issue.type]}`}>
                  {issue.type}
                </span>
              </td>

              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${statusStyles[issue.status]}`}>
                  {issue.status.replace('_', ' ')}
                </span>
              </td>

              <td className="px-6 py-4">
                {issue.assignedTo ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-sapphire-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xs">
                      {issue.assignedTo.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-300">{issue.assignedTo}</span>
                  </div>
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </td>

              <td className="px-6 py-4 text-gray-400 text-sm">
                {issue.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
