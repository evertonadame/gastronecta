import React from "react";
import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ButtonUI from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInputUI from "../../components/TextInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GlobeIntro from "../../../assets/globe.svg";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useSignIn } from "@clerk/clerk-expo";

const schema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.email && data.password, {
    message: "Preencha todos os campos",
    path: ["email", "password"],
  });

export default function SignIn() {
  const [isLoading, setLoading] = React.useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const completedSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      await setActive({
        session: completedSignIn.createdSessionId,
      });
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
    <KeyboardAwareScrollView>
      <View className="flex flex-1 mx-auto mt-20 overflow-hidden w-full px-10 relative h-full justify-between">
        <View>
          <GlobeIntro
            width={260}
            height={140}
            style={{
              marginLeft: 10,
            }}
          />
          <View className="flex items-center justify-center">
            <Text className="text-primary-300 text-2xl font-semibold mt-6 mb-4 text-center">
              Bem vindo ao SpotShare
            </Text>
            <Text className="text-primary-300 mb-4 w-52 text-center">
              Conectando pessoas e lugares, a diversão ao seu alcance
            </Text>
          </View>
        </View>
        <View className="flex items-center justify-center w-full mb-10">
          <View className="flex w-full">
            <TextInputUI
              autoCapitalize="none"
              placeholder="Email"
              keyboardType="email-address"
              icon={
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color="black"
                />
              }
              name="email"
              control={control}
            />
            <TextInputUI
              control={control}
              icon={
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={24}
                  color="black"
                />
              }
              name="password"
              placeholder="Senha"
              secureTextEntry
            />
          </View>
          <ButtonUI
            title="Entrar"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
          <Text
            onPress={() => router.push("/reset")}
            className="text-tertiary-300 text-center mt-4"
          >
            Esqueceu sua senha?{" "}
            <Text
              className="text-tertiary-300"
              onPress={() => router.push("/reset")}
            >
              Recupere aqui
            </Text>
          </Text>
        </View>
        <Text
          className="text-primary-300 text-center mt-14"
          onPress={() => router.push("/register")}
        >
          Não tem uma conta?{" "}
          <Text
            className="text-tertiary-300"
            onPress={() => router.push("/register")}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
