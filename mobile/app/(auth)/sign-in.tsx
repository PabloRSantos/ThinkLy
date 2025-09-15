import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import Logo from "@/components/ui/logo/logo";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { SignInRequest, useSignIn } from "@/services/auth/sign-in.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SignIn() {
  const { mutate, isPending } = useSignIn();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async () => {
    setErrors([]);
    const data = plainToInstance(SignInRequest, {
      email,
      password,
    });
    const errors = await validate(data, {
      stopAtFirstError: true,
    });

    if (errors.length > 0) {
      setErrors(
        errors.map((err) => Object.values(err.constraints || {})).flat()
      );
      return;
    }

    mutate(data, {
      onError: () => {
        toast.show({
          id: Math.random().toString(),
          placement: "top",
          duration: 3000,
          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="error" variant="solid">
                <ToastTitle>Erro</ToastTitle>
                <ToastDescription>E-mail ou senha incorretos</ToastDescription>
              </Toast>
            );
          },
        });
      },
    });
  };

  return (
    <Box className="flex-1 justify-between items-center bg-white px-6 py-32">
      <VStack className="items-center" space="xs">
        <Logo />
        <Heading size="4xl" className="mt-[-10px]">
          ThinkLy
        </Heading>
      </VStack>

      <VStack className="w-full" space="xl">
        <Heading size="3xl" className="text-center mb-12 ">
          Login
        </Heading>

        <FormControl isInvalid={!!errors.length} size="md">
          <VStack className="w-full" space="xl">
            <Input variant="underlined">
              <InputField
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
            </Input>

            <Input variant="underlined">
              <InputField
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                onChangeText={setPassword}
              />
              <InputSlot
                className="pr-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>

            <FormControlError>
              <VStack space="sm">
                {errors.map((error, index) => (
                  <HStack key={index} space="sm" className="items-center">
                    <FormControlErrorIcon
                      as={AlertCircleIcon}
                      className="text-red-500"
                    />
                    <FormControlErrorText className="text-red-500">
                      {error}
                    </FormControlErrorText>
                  </HStack>
                ))}
              </VStack>
            </FormControlError>
          </VStack>
        </FormControl>

        <Button
          onPress={onSubmit}
          action="primary"
          className="w-full rounded-xl"
          size="lg"
          disabled={isPending}
        >
          {isPending ? (
            <ButtonSpinner className="text-secondary-600" />
          ) : (
            <ButtonText className="font-normal" action="primary">
              Login
            </ButtonText>
          )}
        </Button>

        <HStack className="w-full px-3">
          <Text className="text-typography-950">Não possui conta? </Text>
          <Link
            href="/(auth)/sign-up"
            className="text-blue-500 font-semibold underline"
          >
            Criar conta →
          </Link>
        </HStack>
      </VStack>

      <View />
    </Box>
  );
}
