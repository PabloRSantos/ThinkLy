import api from "@/config/api.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export class CreateInsightRequest {
  title: string;
}

export function useCreateInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title }: CreateInsightRequest) => {
      await api.post("/insights", {
        title,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights"] });
    },
  });
}
