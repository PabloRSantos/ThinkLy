import { useAuthStore } from "@/stores/auth.store";
import { Text, View } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "../avatar";

export default function Header() {
  const user = useAuthStore((store) => store.user);

  return (
    <View className="pt-12 pb-4 px-6 bg-white">
      <Text className="text-center text-2xl font-bold">ThinkLy</Text>
      <View className="flex-row items-center mt-4 gap-4">
        <Avatar>
          <AvatarFallbackText>SS</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: user?.photoUrl,
            }}
          />
        </Avatar>

        <View>
          <Text className="text-gray-500">Olá</Text>
          <Text className="font-bold text-lg">{user?.name}</Text>
        </View>
      </View>
    </View>
  );
}
