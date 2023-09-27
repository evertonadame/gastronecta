import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import TextInputUI from "../../components/TextInput";
import ButtonUI from "../../components/Button";
import { router } from "expo-router";

const schema = z.object({
  code: z.string().min(6, "O código deve ter no mínimo 6 caracteres"),
});

const Register = () => {
  const [isLoading, setLoading] = React.useState(false);
  const { isLoaded, setActive, signUp } = useSignUp();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitVerify = async (data) => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completedSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      await setActive({
        session: completedSignUp.createdSessionId,
      });

      router.push("/home");
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
    <KeyboardAwareScrollView className="flex-1 justify-center items-center">
      <View className="px-10 mt-10 flex-1 justify-center items-center">
        <TextInputUI
          icon={
            <MaterialCommunityIcons
              name="code-braces"
              size={24}
              color="black"
            />
          }
          name="code"
          placeholder="Código de verificação"
          control={control}
        />
        <ButtonUI
          title="Confirmar"
          onPress={handleSubmit(onSubmitVerify)}
          loading={isLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;
