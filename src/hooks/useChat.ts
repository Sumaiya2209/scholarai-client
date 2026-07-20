import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ChatMessage } from "@/types";

export function useChatHistory(paperId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["chat", paperId],
    queryFn: () => api.get<{ messages: ChatMessage[] }>(`/api/chat/${paperId}`),
    enabled,
  });
}

export function useSendChatMessage(paperId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) =>
      api.post<{ userMessage: ChatMessage; assistantMessage: ChatMessage }>(`/api/chat/${paperId}`, {
        message,
      }),
    onSuccess: (data) => {
      // Immediately update the cache with the response to preserve correct message order
      queryClient.setQueryData(["chat", paperId], (oldData: any) => ({
        messages: [...(oldData?.messages || []), data.userMessage, data.assistantMessage],
      }));
    },
  });
}