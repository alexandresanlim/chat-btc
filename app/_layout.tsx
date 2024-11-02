import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const colors = Colors[colorScheme ?? "light"];

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text },
        statusBarColor: colors.background,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "ChatBTC",
        }}
      />
    </Stack>
  );
}
