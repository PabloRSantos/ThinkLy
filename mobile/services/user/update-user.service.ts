import api from "@/config/api.config";
import { UserModel } from "@/models/user.model";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { IsEmail, IsOptional, IsStrongPassword } from "class-validator";

export class UpdateUserRequest {
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsStrongPassword()
  @IsOptional()
  password: string;

  userId: number;
}

export function useUpdateUser() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      userId,
    }: UpdateUserRequest) => {
      await api.put(`/users/${userId}`, {
        name,
        email,
        password,
      });
    },
    onSuccess: (_, { name, email }) => {
      setUser({ ...(user as UserModel), name, email });
    },
  });
}
