import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useAuthStore } from "@/stores/auth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Stack } from "expo-router";
import "nativewind";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  const user = useAuthStore((s) => s.user);

  return (
    <GluestackUIProvider>
      <QueryClientProvider client={queryClient}>
        {user ? (
          <Redirect href="/(app)/home" />
        ) : (
          <Redirect href="/(auth)/sign-in" />
        )}

        <Stack>
          {user ? (
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )}
        </Stack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
