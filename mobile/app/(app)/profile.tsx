import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useDeleteUserById } from "@/services/user/delete-user.service";
import { useUpdateUser } from "@/services/user/update-user.service";
import { useAuthStore } from "@/stores/auth.store";
import {
  Delete03Icon,
  Edit02Icon,
  Logout03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useState } from "react";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toast = useToast();

  const { mutate: updateUserMutate } = useUpdateUser();
  const { mutate: deleteUserMutate } = useDeleteUserById();

  const [password, setPassword] = useState("");

  const [showDeleteConfirmationAlert, setShowDeleteConfirmationAlert] =
    useState(false);

  const deleteUser = (): void => {
    deleteUserMutate(
      {
        password,
      },
      {
        onSuccess: () => {
          toast.show({
            id: Math.random().toString(),
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
              return (
                <Toast nativeID={id} action="success" variant="solid">
                  <ToastTitle>Sucesso</ToastTitle>
                  <ToastDescription>
                    Conta excluida com sucesso!
                  </ToastDescription>
                </Toast>
              );
            },
          });
          logout();
        },
        onError: () => {
          toast.show({
            id: Math.random().toString(),
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
              return (
                <Toast nativeID={id} action="error" variant="solid">
                  <ToastTitle>Erro</ToastTitle>
                  <ToastDescription>
                    Erro ao excluir conta, confira se a senha está correta
                  </ToastDescription>
                </Toast>
              );
            },
          });
        },
      }
    );
  };

  return (
    <>
      <Box className="mt-18 m-12 flex-1">
        <Heading size="2xl" className="mb-8">
          Configuração
        </Heading>
        <Box className="items-center mb-4">
          <Avatar className="w-24 h-24">
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user?.photoUrl,
              }}
            />
          </Avatar>
          <Text className="text-lg font-bold mt-2">{user?.name}</Text>
        </Box>
        <VStack space="sm" className="mb-6">
          <HStack className="bg-white rounded-xl p-4 items-center justify-between">
            <Box>
              <Text className="font-bold">Nome</Text>
              <Text className="text-gray-500">{user?.name}</Text>
            </Box>
            <Button variant="link">
              <HugeiconsIcon icon={Edit02Icon} />
            </Button>
          </HStack>

          <HStack className="bg-white rounded-xl p-4 items-center justify-between">
            <Box>
              <Text className="font-bold">Email</Text>
              <Text className="text-gray-500">{user?.email}</Text>
            </Box>
            <Button variant="link">
              <HugeiconsIcon icon={Edit02Icon} />
            </Button>
          </HStack>

          <HStack className="bg-white rounded-xl p-4 items-center justify-between">
            <Box>
              <Text className="font-bold">Senha</Text>
              <Text className="text-gray-500">*************</Text>
            </Box>
            <Button variant="link">
              <HugeiconsIcon icon={Edit02Icon} />
            </Button>
          </HStack>
        </VStack>
        <ButtonGroup>
          <Button
            size="lg"
            action="negative"
            variant="link"
            className="justify-start px-6"
            onPress={() => setShowDeleteConfirmationAlert(true)}
          >
            <HugeiconsIcon icon={Delete03Icon} color="#EF4444" />
            <ButtonText>Excluir conta</ButtonText>
          </Button>
          <Button
            size="lg"
            variant="solid"
            action="secondary"
            className="justify-start"
            onPress={logout}
          >
            <HugeiconsIcon icon={Logout03Icon} />
            <ButtonText>Sair</ButtonText>
          </Button>
        </ButtonGroup>
      </Box>

      <AlertDialog
        closeOnOverlayClick={false}
        isOpen={showDeleteConfirmationAlert}
        onClose={() => setShowDeleteConfirmationAlert(false)}
        size="md"
      >
        <AlertDialogBackdrop />

        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col items-start">
            <Text className="text-xl font-bold mb-2">Excluir conta</Text>
            <Text className="text-base text-gray-600">
              Para confirmar a exclusão da sua conta confirme sua senha
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody className="my-6">
            <Input variant="underlined">
              <InputField
                placeholder="Senha"
                onChangeText={setPassword}
                secureTextEntry
              />
            </Input>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup className="w-full">
              <Button
                className="w-full"
                variant="solid"
                action="negative"
                onPress={deleteUser}
                size="sm"
              >
                <ButtonText>Excluir</ButtonText>
              </Button>
              <Button
                variant="link"
                className="w-full"
                size="sm"
                onPress={() => setShowDeleteConfirmationAlert(false)}
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
