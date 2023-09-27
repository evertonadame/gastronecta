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

const schema = z
  .object({
    code: z.string().min(6, "O código deve ter no mínimo 6 caracteres"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

const PwReset = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Reset the password with the code and the new password
  const onReset = async (data) => {
    try {
      setIsLoading(true);
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });

      Toast.show({
        autoHide: true,
        type: "success",
        text1: "Sucesso!",
        text2: "Senha alterada com sucesso!",
        visibilityTime: 2000,
      });

      setTimeout(async () => {
        await setActive({ session: result.createdSessionId });
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
        name="code"
        icon={
          <MaterialCommunityIcons name="code-braces" size={24} color="black" />
        }
        placeholder="Código de verificação"
      />
      <TextInputUI
        control={control}
        secureTextEntry
        name="password"
        icon={
          <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
        }
        placeholder="Senha"
      />
      <TextInputUI
        control={control}
        name="confirmPassword"
        secureTextEntry
        icon={
          <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
        }
        placeholder="Confirmar senha"
      />
      <ButtonUI
        onPress={handleSubmit(onReset)}
        title="Resetar senha"
        loading={isLoading}
      />
    </View>
  );
};

export default PwReset;
