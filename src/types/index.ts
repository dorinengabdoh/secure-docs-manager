export interface Archive {
  id: number;
  title: string;
  type: string;
  author: string;
  date: string;
  size: string;
  keywords: string;
  isArchived: boolean;
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
  author: string;
  type: string;
  keywords: string;
  file: File | null;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

export type ViewType =
  | "dashboard"
  | "archives"
  | "import-document"
  | "document-index"
  | "approve-document"
  | "users"
  | "settings";
export type FilterType = "all" | "pdf" | "doc";
export type SortBy = "date" | "type" | "author";
export type SortOrder = "ascending" | "descending";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "archiviste" | "approver";
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
