import api from "@/config/api.config";
import { InsightModel } from "@/models/insight.model";
import { useQuery } from "@tanstack/react-query";

export const useGetInsightById = (id: number) => {
  return useQuery({
    queryKey: ["insights", id],
    queryFn: async (): Promise<InsightModel | null> => {
      const response = await api.get<InsightModel>(`/insights/${id}`);
      return response.data;
    },
  });
};
