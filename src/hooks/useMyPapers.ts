import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Paper } from "@/types";

export function useMyPapers() {
  return useQuery({
    queryKey: ["papers", "mine"],
    queryFn: () => api.get<{ papers: Paper[] }>("/api/papers/mine"),
  });
}