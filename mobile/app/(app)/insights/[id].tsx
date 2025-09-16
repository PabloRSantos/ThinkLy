import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { useDeleteInsightById } from "@/services/insights/delete-insight-by-id.service";
import { useGetInsightById } from "@/services/insights/get-insight-by-id.service";
import { useCreateTopic } from "@/services/topics/create-topic.service";
import { Feather } from "@expo/vector-icons";
import { Delete03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Location from "expo-location";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function InsightDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: insight, isLoading, error } = useGetInsightById(Number(id));
  const { mutate: deleteInsightMutate } = useDeleteInsightById(Number(id));
  const { mutate: createTopicMutate, isPending: isCreatingTopic } =
    useCreateTopic();

  const [newTopic, setNewTopic] = useState("");
  const [isShowInput, setIsShowInput] = useState(false);
  const toast = useToast();

  const [showDeleteConfirmationAlert, setShowDeleteConfirmationAlert] =
    useState(false);

  if (isLoading) {
    return <Spinner className="flex-1" />;
  }

  if (error || !insight) {
    toast.show({
      id: "error-insight-not-found",
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="error" variant="solid">
            <ToastTitle>Erro</ToastTitle>
            <ToastDescription>Insight não encontrado</ToastDescription>
          </Toast>
        );
      },
    });

    return <Redirect href="/(app)/home" />;
  }

  const createTopic = async (): Promise<void> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      toast.show({
        id: Math.random().toString(),
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Erro</ToastTitle>
              <ToastDescription>
                Permissão para acessar a localização foi negada
              </ToastDescription>
            </Toast>
          );
        },
      });
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    createTopicMutate({
      text: newTopic,
      insightId: Number(id),
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
    });
  };

  return (
    <>
      <AlertDialog
        isOpen={showDeleteConfirmationAlert}
        onClose={() => setShowDeleteConfirmationAlert(false)}
        size="md"
      >
        <AlertDialogBackdrop />

        <AlertDialogContent>
          <AlertDialogHeader>
            <Text size="xl" className="font-bold mb-2">
              Excluir insight
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text className="text-base text-gray-600 mb-6">
              Para confirmar a exclusão, clique no botão abaixo
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup className="w-full">
              <Button
                className="w-full"
                variant="solid"
                action="negative"
                onPress={() => {
                  deleteInsightMutate();
                  setShowDeleteConfirmationAlert(false);
                }}
                size="sm"
              >
                <ButtonText>Excluir</ButtonText>
              </Button>
              <Button
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

      <Box className="flex-1 p-6">
        <HStack className="justify-between align-items-center">
          <Text className="text-2xl font-bold self-center">
            {insight.title}
          </Text>
          <Button
            variant="link"
            size="lg"
            action="negative"
            onPress={() => {
              setShowDeleteConfirmationAlert(true);
            }}
          >
            <HugeiconsIcon icon={Delete03Icon} color="#EF4444" />
          </Button>
        </HStack>
        <FlatList
          data={insight.topics}
          keyExtractor={(item) => String(item.id)}
          className="rounded-xl"
          renderItem={({ item: topic }) => (
            <Box className="bg-white p-4 rounded-xl">
              <Markdown>{topic.answer}</Markdown>
            </Box>
          )}
          ItemSeparatorComponent={() => <View className="bg-gray-100 h-3" />}
        />
        {isCreatingTopic && (
          <Box className="bg-white p-4 rounded-xl mt-3">
            <Text>Criando tópico...</Text>
          </Box>
        )}

        {!isShowInput && (
          <Button onPress={() => setIsShowInput(true)} className="mt-4">
            <ButtonText>Criar novo tópico</ButtonText>
          </Button>
        )}
      </Box>

      {isShowInput && (
        <HStack
          space="lg"
          className="ustify-between items-center w-full px-8 py-4 rounded-t-2xl bg-white"
        >
          <Input variant="rounded" className="bg-gray-100 flex-1" size="lg">
            <InputField
              placeholder="Escreve um novo tópico"
              onChangeText={setNewTopic}
            />
          </Input>

          <Button
            action="default"
            variant="link"
            className="p-0"
            onPress={createTopic}
          >
            <Feather
              name="send"
              size={18}
              color="#222"
              className="border border-gray-300 rounded-full p-2"
            />
          </Button>
        </HStack>
      )}
    </>
  );
}
