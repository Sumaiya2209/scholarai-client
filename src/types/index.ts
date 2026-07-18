export type PaperStatus = "pending" | "approved" | "rejected";

export interface Paper {
  _id: string;
  title: string;
  abstract: string;
  authors: string[];
  field: string;
  fileUrl: string;
  status: PaperStatus;
  rejectionReason?: string;
  aiSummary?: string;
  aiKeyPoints?: string[];
  views: number;
  downloads: number;
  uploadedBy: string | { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPapers {
  papers: Paper[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ChatMessage {
  _id: string;
  paperId: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}
