export interface Archive {
  id: number;
  title: string;
  type: string;
  author: string;
  date: string;
  size: string;
  status: string;
}

export interface Notification {
  id: number;
  title: string;
  author: string;
  date: string;
  type: string;
}

export interface NewArchive {
  title: string;
  description: string;
  category: string;
  recipients: string;
  file: File | null;
}

export type ViewType = 'dashboard' | 'archives' | 'users' | 'settings';
export type FilterType = 'all' | 'pdf' | 'doc';
export type SortBy = 'date' | 'type' | 'author';
export type SortOrder = 'ascending' | 'descending';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}