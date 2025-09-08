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
  extension: string;
  fileName: string;
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
  status: string;
  file: File | null;
}

export interface NewUser {
  id: number;
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
export type FilterType = "author" | "type" | "date" | "all";
export type SortBy = "author" | "type" | "date" | "title" | "status";
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
