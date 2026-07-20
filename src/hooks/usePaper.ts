import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Paper } from "@/types";

export function usePaper(id: string) {
  return useQuery({
    queryKey: ["papers", id],
    queryFn: () => api.get<{ paper: Paper }>(`/api/papers/${id}`),
    enabled: !!id,
  });
}

export function useRelatedPapers(id: string) {
  return useQuery({
    queryKey: ["papers", id, "related"],
    queryFn: () => api.get<{ papers: Paper[] }>(`/api/papers/${id}/related`),
    enabled: !!id,
  });
}