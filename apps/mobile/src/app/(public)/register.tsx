import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { api } from "../../lib/axios";
import TextInputUI from "../../components/TextInput";
import ButtonUI from "../../components/Button";
import { router } from "expo-router";

const schema = z
  .object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    lastName: z.string().min(3, "O sobrenome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["password", "confirmPassword"],
  });

const Register = () => {
  const [isLoading, setLoading] = React.useState(false);
  const { isLoaded, signUp } = useSignUp();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitClerk = async (data) => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name,
        lastName: data.lastName,
        username: data.name + data.lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      Toast.show({
        autoHide: true,
        type: "success",
        visibilityTime: 2000,
        text1: "Sucesso!",
        text2: "Email de confirmação enviado",
      });

      setTimeout(() => {
        router.push("/confirm");
      }, 2000);
    } catch (error) {
      Toast.show({
        autoHide: true,
        type: "error",
        text1: "Ops!",
        text2: error.errors?.[0]?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView className="flex w-full h-full mt-10">
      <View className="px-10 mt-10">
        <TextInputUI
          icon={
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="black"
            />
          }
          name="name"
          placeholder="Nome"
          control={control}
        />
        <TextInputUI
          icon={
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="black"
            />
          }
          name="lastName"
          placeholder="Sobrenome"
          control={control}
        />
        <TextInputUI
          autoCapitalize="none"
          keyboardType="email-address"
          icon={
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
          }
          name="email"
          placeholder="Email"
          control={control}
        />
        <TextInputUI
          icon={
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="black"
            />
          }
          name="password"
          placeholder="Senha"
          control={control}
          secureTextEntry
        />
        <TextInputUI
          icon={
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="black"
            />
          }
          secureTextEntry
          name="confirmPassword"
          placeholder="Confirmar senha"
          control={control}
        />
        <ButtonUI
          title="Cadastrar"
          onPress={handleSubmit(onSubmitClerk)}
          loading={isLoading}
        />
      </View>
      <View className="mt-16">
        <Text
          className="text-primary-300 text-center mb-4"
          onPress={() => router.push("/login")}
        >
          Já tem uma conta?{" "}
          <Text
            className="text-tertiary-300 z-40"
            onPress={() => router.push("/login")}
          >
            Entre aqui
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;
