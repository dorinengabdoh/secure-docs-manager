import { Archive, Notification } from "../types";

export const mockArchives: Archive[] = [
  {
    id: 1,
    title: "Financial Report 2024",
    type: "Contrat",
    author: "John Doe",
    date: "2024-03-15",
    size: "2.5 MB",
    status: "approved",
    keywords: "Dupont, 2024, juridique",
    isArchived: false,
  },
  {
    id: 2,
    title: "Meeting Minutes",
    type: "Diplome",
    author: "Jane Smith",
    date: "2024-03-14",
    size: "1.2 MB",
    status: "archived",
    keywords: "Dupont, 2024, juridique",
    isArchived: true,
  },
  {
    id: 3,
    title: "Hiring Interview",
    type: "Interview",
    author: "Smith Jane",
    date: "2024-03-14",
    size: "1.2 MB",
    status: "reject",
    keywords: "Dupont, 2024, juridique",
    isArchived: true,
  },
  {
    id: 2,
    title: "Meeting Minutes",
    type: "Diplome",
    author: "Jane Smith",
    date: "2024-03-14",
    size: "1.2 MB",
    status: "pending",
    keywords: "Dupont, 2024, juridique",
    isArchived: true,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Financial Report 2024",
    author: "John Doe",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: "new_archive",
  },
  {
    id: 2,
    title: "Meeting Minutes",
    author: "Jane Smith",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    type: "new_archive",
  },
];
