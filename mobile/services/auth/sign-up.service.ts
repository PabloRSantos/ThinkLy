import { Match } from "@/class-validator/match.decorator";
import api from "@/config/api.config";
import { UserModel } from "@/models/user.model";
import { useMutation } from "@tanstack/react-query";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignUpRequest {
  @IsNotEmpty({ message: "O nome é obrigatório" })
  name: string;

  @IsEmail({}, { message: "E-mail inválido" })
  @IsNotEmpty({ message: "O e-mail é obrigatório" })
  email: string;

  @IsStrongPassword({}, { message: "A senha é muito fraca" })
  @IsNotEmpty({ message: "A senha é obrigatória" })
  password: string;

  @Match(SignUpRequest, ({ password }) => password, {
    message: "As senhas não correspondem",
  })
  confirmationPassword: string;
}

export class SignUpResponse {
  user: UserModel;
  token: string;
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password, name }: SignUpRequest) => {
      const response = await api.post<SignUpResponse>("/auth/sign-up", {
        email,
        password,
        name,
      });
      return response.data;
    },
  });
}
