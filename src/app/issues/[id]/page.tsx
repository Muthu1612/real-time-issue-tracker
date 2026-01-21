import { getIssueById } from '@/features/issues/services';
import { notFound } from 'next/navigation';

interface SingleIssuePageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleIssuePage({ params }: SingleIssuePageProps) {
  const { id } = await params;
  const issue = await getIssueById(id);

  if (!issue) {
    return notFound();
  }

  return (
    <main className="p-8 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{issue.title}</h1>

      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span>Status: {issue.status}</span>
        <span>Type: {issue.type}</span>
        <span>Created: {issue.createdAt.toLocaleString()}</span>
        <span>Assigned to: {issue.assignedTo ?? '—'}</span>
      </div>

      <section className="mt-4 text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{issue.description}</p>
      </section>
    </main>
  );
}