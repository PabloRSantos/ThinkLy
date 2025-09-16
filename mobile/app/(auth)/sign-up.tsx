import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
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
import { VStack } from "@/components/ui/vstack";
import { SignUpRequest, useSignUp } from "@/services/auth/sign-up.service";
import { useAuthStore } from "@/stores/auth.store";
import { CheckmarkSquare03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SignUp() {
  const { mutate, isPending } = useSignUp();
  const setUser = useAuthStore((store) => store.setUser);
  const setToken = useAuthStore((store) => store.setToken);

  const [isShowModal, setIsShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async () => {
    setErrors([]);

    const data = plainToInstance(SignUpRequest, {
      name,
      email,
      password,
      confirmationPassword,
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
      onSuccess: (data) => {
        setIsShowModal(true);

        setTimeout(() => {
          setIsShowModal(false);
          setUser(data.user);
          setToken(data.token);
        }, 2500);
      },
    });
  };

  return (
    <>
      <AlertDialog
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        closeOnOverlayClick
        size="md"
      >
        <AlertDialogBackdrop />

        <AlertDialogContent
          action="positive"
          className="items-center justify-center gap-4"
        >
          <AlertDialogHeader>
            <HugeiconsIcon
              icon={CheckmarkSquare03Icon}
              size={42}
              color="#166534"
            />
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text className="font-bold text-base text-success-800">
              Conta registrada com sucesso!
            </Text>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>

      <Box className="flex-1 justify-between items-center bg-white px-6 py-32">
        <VStack className="items-center" space="xs">
          <Logo />
          <Heading size="4xl" className="mt-[-10px]">
            ThinkLy
          </Heading>
        </VStack>

        <VStack className="w-full" space="xl">
          <Heading size="3xl" className="text-center mb-12 ">
            Crie sua conta
          </Heading>

          <FormControl isInvalid={!!errors.length} size="md">
            <VStack className="w-full" space="xl">
              <Input variant="underlined">
                <InputField placeholder="Nome" onChangeText={setName} />
              </Input>

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

              <Input variant="underlined">
                <InputField
                  placeholder="Confirmar senha"
                  type={showConfirmationPassword ? "text" : "password"}
                  onChangeText={setConfirmationPassword}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() =>
                    setShowConfirmationPassword(!showConfirmationPassword)
                  }
                >
                  <InputIcon
                    as={showConfirmationPassword ? EyeIcon : EyeOffIcon}
                  />
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
                Criar conta
              </ButtonText>
            )}
          </Button>

          <HStack className="w-full px-3">
            <Text className="text-typography-950">Já possui conta? </Text>
            <Link
              href="/(auth)/sign-in"
              className="text-blue-500 font-semibold underline"
            >
              Fazer login →
            </Link>
          </HStack>
        </VStack>

        <View />
      </Box>
    </>
  );
}
