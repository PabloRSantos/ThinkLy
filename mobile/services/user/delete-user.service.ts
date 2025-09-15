import api from "@/config/api.config";
import { useMutation } from "@tanstack/react-query";
import { IsNotEmpty } from "class-validator";

export class DeleteUserRequest {
  @IsNotEmpty()
  password: string;
}

export function useDeleteUserById() {
  return useMutation({
    mutationFn: async ({ password }: DeleteUserRequest) => {
      await api.delete(`/users/me`, { data: { password } });
    },
  });
}
