import Link from 'next/link';
import { Issue } from '../types';

interface IssueCardProps {
  issue: Issue;
}

const statusColors: Record<Issue['status'], string> = {
  OPEN: 'bg-red-500/20 text-red-400 border-red-500/30',
  IN_PROGRESS: 'bg-sapphire-500/20 text-sapphire-400 border-sapphire-500/30',
  CLOSED: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const typeColors: Record<Issue['type'], string> = {
  BUG: 'text-red-300',
  FEATURE: 'text-purple-300',
  TASK: 'text-blue-300',
};

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <Link href={`/issues/${issue.id}`}>
      <div className="group border border-sapphire-800/30 rounded-xl bg-gray-900/40 backdrop-blur-sm p-5 hover:border-sapphire-600/50 hover:scale-105 transition-all duration-300 flex flex-col justify-between h-full">
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-semibold text-lg text-white line-clamp-2 group-hover:text-sapphire-400 transition-colors">
              {issue.title}
            </h3>
            <span className={`text-xs px-3 py-1 rounded-lg border font-medium whitespace-nowrap ${statusColors[issue.status]}`}>
              {issue.status.replace('_', ' ')}
            </span>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2">
            {issue.description}
          </p>
        </div>

        <div className="flex justify-between items-center text-xs mt-4 pt-4 border-t border-gray-800">
          <span className={`font-medium ${typeColors[issue.type]}`}>
            {issue.type}
          </span>
          <span className="text-sapphire-400 group-hover:text-sapphire-300 font-medium">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
