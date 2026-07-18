import { api } from "@/lib/api";

export interface PlatformStats {
  approvedPapers: number;
  fieldsCount: number;
  totalViews: number;
  summariesGenerated: number;
}

export function getPlatformStats() {
  return api.get<PlatformStats>("/api/papers/stats");
}