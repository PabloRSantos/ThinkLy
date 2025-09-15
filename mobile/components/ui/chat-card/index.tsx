import { useCreateInsight } from "@/services/insights/create-insight.service";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Box } from "../box";
import { Divider } from "../divider";
import { Input, InputField, InputIcon, InputSlot } from "../input";
import { Text } from "../text";

type ChatCardProps = {
  isFirstInsight: boolean;
};

export default function ChatCard({ isFirstInsight }: ChatCardProps) {
  const { mutate } = useCreateInsight();
  const [theme, setTheme] = useState("");

  const onSubmit = () => {
    mutate({ title: theme });
  };

  return (
    <Box className="bg-white rounded-xl shadow p-4">
      <Text size="xl" className="text-center font-medium text-lg">
        Chat
      </Text>
      <Divider className="my-2" />
      <Text className="text-center text-gray-500 mb-4">
        {isFirstInsight
          ? "Crie seu primeiro insight de forma rápida!"
          : "Tenha um novo insight a qualquer momento"}
      </Text>

      <Input variant="rounded" className="bg-gray-100" size="lg">
        <InputField placeholder="Escreva um tema" onChangeText={setTheme} />
        <InputSlot
          className="mr-3 bg-white rounded-full p-2 shadow"
          disabled={!theme.trim()}
          onPress={onSubmit}
        >
          <InputIcon as={Feather} name="send" size={18} color="#222" />
        </InputSlot>
      </Input>
    </Box>
  );
}
