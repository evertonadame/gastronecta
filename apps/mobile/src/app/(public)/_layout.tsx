import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTitleStyle: {
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          title: "Cadastre-se",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          title: "Resetar senha",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="confirm-reset"
        options={{
          title: "Confirmar senha",
        }}
      ></Stack.Screen>
      <Stack.Screen name="confirm"></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
