import { InsightModel } from "@/models/insight.model";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { cssInterop } from "nativewind";
import { FlatList, FlatListProps, Pressable, Text, View } from "react-native";

cssInterop(Image, { className: "style" });

type InsightsListProps = Omit<FlatListProps<InsightModel>, "renderItem">;

export default function InsightsList({ data }: InsightsListProps) {
  function formatDate(date: Date) {
    const time = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    const dayMonthYear = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);

    return `${time} - ${dayMonthYear}`;
  }

  function sanitizeMarkdown(text: string) {
    const textWithoutTags = text.replace(/[#*]/g, "");
    return textWithoutTags.trim();
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={() => (
        <View className="items-center">
          <Image
            source={require("../../../assets/svg/empty.svg")}
            className="w-[208] h-[208]"
          />

          <Text className="text-center text-lg font-semibold">
            Nenhum insight foi criado até o momento.
          </Text>
        </View>
      )}
      ListHeaderComponent={() => (
        <Text className="text-xl font-bold mx-2 mb-2">Ultimos Insights</Text>
      )}
      renderItem={({ item: insight }) => (
        <Link key={insight.id} href={`/(app)/insights/${insight.id}`} asChild>
          <Pressable className="bg-white rounded-xl shadow-sm p-4 mb-3 mx-2 flex-row items-center">
            <View className="flex-1">
              <View className="flex-row justify-between">
                <View>
                  <Text className="font-bold text-base mb-1">
                    {insight.title}
                  </Text>
                  <Text className="text-xs text-gray-500 mb-1">
                    Data: {formatDate(new Date(insight.createdAt))}
                  </Text>
                </View>

                <HugeiconsIcon icon={ArrowRight01Icon} />
              </View>

              {insight.topics?.length ? (
                <Text
                  className="text-gray-700"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {sanitizeMarkdown(insight.topics[0].answer)}
                </Text>
              ) : (
                <View />
              )}
            </View>
          </Pressable>
        </Link>
      )}
    />
  );
}
