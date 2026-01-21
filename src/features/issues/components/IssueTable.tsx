import Link from 'next/link';
import { Issue } from '../types';

interface IssueTableProps {
  issues: Issue[];
}

export default function IssueTable({ issues }: IssueTableProps) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Assigned To</th>
            <th className="px-4 py-2">Created</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue) => (
            <tr
              key={issue.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-2 font-medium">
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {issue.title}
                </Link>
              </td>

              <td className="px-4 py-2">{issue.type}</td>
              <td className="px-4 py-2">{issue.status}</td>
              <td className="px-4 py-2">
                {issue.assignedTo ?? '—'}
              </td>
              <td className="px-4 py-2 text-gray-500">
                {issue.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
