import { Issue } from './types';

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Login button not working',
    description: 'Users cannot log in using the login button on Safari.',
    status: 'OPEN',
    type: 'BUG',
    createdAt: new Date(),
    assignedTo: 'alice',
  },
  {
    id: '2',
    title: 'Add dark mode support',
    description: 'Users want a dark mode option in settings.',
    status: 'IN_PROGRESS',
    type: 'FEATURE',
    createdAt: new Date(),
    assignedTo: 'bob',
  },
  {
    id: '3',
    title: 'Improve dashboard performance',
    description: 'Dashboard takes too long to load with many issues.',
    status: 'CLOSED',
    type: 'TASK',
    createdAt: new Date(),
  },
];
