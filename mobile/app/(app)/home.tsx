import ChatCard from "@/components/ui/chat-card";
import Header from "@/components/ui/header/header";
import InsightsList from "@/components/ui/insights-list";
import { useListInsights } from "@/services/insights/list-insights.service";
import { View } from "react-native";

export default function Home() {
  const { data: insights, isLoading } = useListInsights();

  return (
    <View className="flex-1 bg-[#FBFBFB]">
      <Header />

      <View className="flex-1 justify-between p-6">
        <InsightsList data={insights || []} />

        <ChatCard isFirstInsight={!!insights?.length} />
      </View>
    </View>
  );
}
