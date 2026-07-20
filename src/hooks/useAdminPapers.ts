import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Paper } from "@/types";

export function usePendingPapers() {
  return useQuery({
    queryKey: ["papers", "pending"],
    queryFn: () => api.get<{ papers: Paper[] }>("/api/admin/papers/pending"),
  });
}

export function useApprovePaper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paperId: string) => api.patch(`/api/admin/papers/${paperId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["papers"] });
    },
  });
}

export function useRejectPaper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ paperId, reason }: { paperId: string; reason: string }) =>
      api.patch(`/api/admin/papers/${paperId}/reject`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["papers"] });
    },
  });
}