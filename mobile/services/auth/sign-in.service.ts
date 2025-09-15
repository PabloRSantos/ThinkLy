import api from "@/config/api.config";
import { UserModel } from "@/models/user.model";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInRequest {
  @IsEmail({}, { message: "E-mail inválido" })
  @IsNotEmpty({ message: "O e-mail é obrigatório" })
  email: string;

  @IsNotEmpty({ message: "A senha é obrigatória" })
  password: string;
}

export class SignInResponse {
  user: UserModel;
  token: string;
}

export function useSignIn() {
  const setUser = useAuthStore((store) => store.setUser);
  const setToken = useAuthStore((store) => store.setToken);

  return useMutation({
    mutationFn: async ({ email, password }: SignInRequest) => {
      const response = await api.post<SignInResponse>("/auth/sign-in", {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
    },
  });
}
