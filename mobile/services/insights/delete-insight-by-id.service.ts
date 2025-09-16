import api from "@/config/api.config";
import { InsightModel } from "@/models/insight.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export function useDeleteInsightById(insightId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await api.delete(`/insights/${insightId}`);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["insights", insightId] });
      queryClient.setQueryData(["insights"], (old: InsightModel[]) => {
        if (!old) return old;
        return old.filter((item) => item.id !== insightId);
      });

      router.replace("/(app)/home");
    },
  });
}
