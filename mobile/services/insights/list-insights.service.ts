import api from "@/config/api.config";
import { InsightModel } from "@/models/insight.model";
import { useQuery } from "@tanstack/react-query";

export const useListInsights = () => {
  return useQuery({
    queryKey: ["insights"],
    queryFn: async (): Promise<InsightModel[]> => {
      const response = await api.get<InsightModel[]>("/insights");
      return response.data;
    },
  });
};
