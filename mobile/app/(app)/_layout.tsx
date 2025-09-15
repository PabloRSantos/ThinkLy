import {
  Home02Icon,
  Idea01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Tabs } from "expo-router";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.black,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon icon={Home02Icon} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon icon={Idea01Icon} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Configuração",
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon icon={Settings02Icon} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
