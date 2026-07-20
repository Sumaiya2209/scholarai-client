import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PaginatedPapers } from "@/types";

interface PaperFilters {
  search?: string;
  field?: string;
  dateRange?: "week" | "month" | "year" | "";
  sort?: "newest" | "oldest" | "mostViewed";
  page?: number;
  limit?: number;
}

export function usePapers(filters: PaperFilters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.field) params.set("field", filters.field);
  if (filters.dateRange) params.set("dateRange", filters.dateRange);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));

  return useQuery({
    queryKey: ["papers", filters],
    queryFn: () => api.get<PaginatedPapers>(`/api/papers?${params.toString()}`),
  });
}