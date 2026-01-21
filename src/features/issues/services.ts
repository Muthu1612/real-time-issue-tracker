import { Issue } from './types';
import { mockIssues } from './mocks';

export async function getLatestIssues(): Promise<Issue[]> {
  // Simulate async backend call
  await new Promise((res) => setTimeout(res, 100));
  return mockIssues;
}

export async function getIssueById(id: string): Promise<Issue | null> {
  await new Promise((res) => setTimeout(res, 100));
  return mockIssues.find((issue) => issue.id === id) ?? null;
}
