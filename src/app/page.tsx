import LatestIssues from '@/features/issues/components/LatestIssues';
import { getLatestIssues } from '@/features/issues/services';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default async function Home() {
  const issues = await getLatestIssues();

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-sapphire-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Real-Time Issue Tracker
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Track, manage, and resolve issues with lightning speed ⚡
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link
              href="/issues"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-sapphire-600 to-sapphire-500 text-white font-medium hover:shadow-lg hover:shadow-sapphire-500/50 transition-all"
            >
              View All Issues
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg border border-sapphire-500/30 text-sapphire-400 font-medium hover:bg-sapphire-500/10 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
        <LatestIssues issues={issues} />
      </main>
    </>
  );
}
