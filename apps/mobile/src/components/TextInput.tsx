import { Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { useState } from "react";

type TextInputProps = React.ComponentProps<typeof TextInput> & {
  name: string;
  control: React.ComponentProps<typeof Controller>["control"];
  rules?: React.ComponentProps<typeof Controller>["rules"];
  icon?: React.ReactNode;
};

const TextInputUI = ({ ...props }: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { name, control, rules, icon, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <View className="relative mb-2 w-full">
          {props.secureTextEntry ? (
            <Text
              onPress={() => setShowPassword(!showPassword)}
              className="absolute top-6 right-3 text-tertiary-200 text-xs pt-1 pr-1 z-10"
            >
              {showPassword ? (
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  size={24}
                  color="black"
                />
              )}
            </Text>
          ) : null}
          {icon ? (
            <View className="absolute top-1/2 -translate-y-[22px] left-3">
              {icon}
            </View>
          ) : null}
          <TextInput
            {...rest}
            onChangeText={onChange}
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry && !showPassword}
            className={`${
              icon ? "pl-10" : "pl-4"
            } border border-tertiary-200 pr-4 pt-4 pb-4 rounded-3xl mb-5`}
          />

          {error ? (
            <Text className="text-red-500 text-xs absolute bottom-0 pl-2">{`${error.message}`}</Text>
          ) : null}
        </View>
      )}
    />
  );
};

export default TextInputUI;
