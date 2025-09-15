import api from "@/config/api.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IsNotEmpty } from "class-validator";

export class CreateTopicRequest {
  @IsNotEmpty()
  text: string;

  insightId: number;
  latitude: string;
  longitude: string;
}

export function useCreateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      text,
      insightId,
      latitude,
      longitude,
    }: CreateTopicRequest) => {
      await api.post("/topics", {
        text,
        insightId,
        latitude,
        longitude,
      });
    },
    onSuccess: (_, { insightId }) => {
      queryClient.invalidateQueries({ queryKey: ["insights", insightId] });
    },
  });
}
