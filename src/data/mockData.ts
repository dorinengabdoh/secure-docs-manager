import { Archive, Notification } from '../types';

export const mockArchives: Archive[] = [
  {
    id: 1,
    title: 'Financial Report 2024',
    type: 'PDF',
    author: 'John Doe',
    date: '2024-03-15',
    size: '2.5 MB',
    status: 'active',
  },
  {
    id: 2,
    title: 'Meeting Minutes',
    type: 'DOC',
    author: 'Jane Smith',
    date: '2024-03-14',
    size: '1.2 MB',
    status: 'archived',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Financial Report 2024',
    author: 'John Doe',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'new_archive',
  },
  {
    id: 2,
    title: 'Meeting Minutes',
    author: 'Jane Smith',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    type: 'new_archive',
  },
];