import { getIssueById } from '@/features/issues/services';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface SingleIssuePageProps {
  params: Promise<{ id: string }>;
}

const statusStyles = {
  OPEN: 'bg-red-500/20 text-red-400 border-red-500/30',
  IN_PROGRESS: 'bg-sapphire-500/20 text-sapphire-400 border-sapphire-500/30',
  CLOSED: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const typeStyles = {
  BUG: 'bg-red-500/10 text-red-300',
  FEATURE: 'bg-purple-500/10 text-purple-300',
  TASK: 'bg-blue-500/10 text-blue-300',
};

export default async function SingleIssuePage({ params }: SingleIssuePageProps) {
  const { id } = await params;
  const issue = await getIssueById(id);

  if (!issue) {
    return notFound();
  }

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <Link
          href="/issues"
          className="text-sapphire-400 hover:text-sapphire-300 transition-colors inline-flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Issues
        </Link>

        <div className="rounded-2xl border border-sapphire-800/30 bg-gray-900/40 backdrop-blur-sm p-8 space-y-6">
          <h1 className="text-4xl font-bold text-white">{issue.title}</h1>

          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-4 py-2 rounded-lg border font-medium text-sm ${statusStyles[issue.status]}`}>
              {issue.status.replace('_', ' ')}
            </span>
            <span className={`px-4 py-2 rounded-lg font-medium text-sm ${typeStyles[issue.type]}`}>
              {issue.type}
            </span>
            <span className="text-gray-400 text-sm">
              Created {issue.createdAt.toLocaleDateString()}
            </span>
            {issue.assignedTo && (
              <span className="ml-auto flex items-center gap-2 text-gray-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sapphire-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">
                  {issue.assignedTo.charAt(0).toUpperCase()}
                </div>
                {issue.assignedTo}
              </span>
            )}
          </div>

          <div className="pt-6 border-t border-gray-800">
            <h2 className="text-xl font-semibold text-gray-200 mb-3">Description</h2>
            <p className="text-gray-400 leading-relaxed">{issue.description}</p>
          </div>
        </div>
      </main>
    </>
  );
}