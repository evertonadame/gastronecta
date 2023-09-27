import { Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSignIn } from "@clerk/clerk-expo";
import TextInputUI from "../../components/TextInput";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonUI from "../../components/Button";
import { router } from "expo-router";

const schema = z.object({
  email: z.string().email("Email inválido"),
});

const PwReset = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSignIn();

  const onRequestReset = async (data) => {
    try {
      setIsLoading(true);
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      });

      Toast.show({
        autoHide: true,
        type: "success",
        text1: "Sucesso!",
        text2: "Email enviado com sucesso!",
        visibilityTime: 2000,
      });

      setTimeout(() => {
        router.push("/confirm-reset");
      }, 2000);
    } catch (err: any) {
      Toast.show({
        autoHide: true,
        type: "error",
        text1: "Ops!",
        text2: err.errors?.[0]?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-14">
      <TextInputUI
        control={control}
        autoCapitalize="none"
        name="email"
        icon={
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
        }
        placeholder="Email"
      />

      <ButtonUI
        onPress={handleSubmit(onRequestReset)}
        title="Resetar senha"
        loading={isLoading}
      />
    </View>
  );
};

export default PwReset;
