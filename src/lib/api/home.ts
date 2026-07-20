import { api } from "@/lib/api";

export interface PlatformStats {
  approvedPapers: number;
  fieldsCount: number;
  totalViews: number;
  summariesGenerated: number;
  fieldBreakdown: { field: string; count: number }[];
}

export function getPlatformStats() {
  return api.get<PlatformStats>("/api/papers/stats");
}