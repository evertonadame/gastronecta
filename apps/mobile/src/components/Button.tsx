import { ActivityIndicator, TouchableOpacity, Text, View } from "react-native";

type ButtonProps = React.ComponentProps<typeof TouchableOpacity> & {
  title?: string;
  icon?: React.ReactNode;
  loading?: boolean;
};

const ButtonUI = ({ ...props }: ButtonProps) => {
  const { title, icon, loading, ...restProps } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      tvParallaxProperties={{
        enabled: true,
        magnification: 1.1,
        pressDelay: 0,
        tiltAngle: 1,
      }}
      className={`relative flex
        ${
          icon
            ? "w-11 h-11 rounded-2xl bg-tertiary-300 justify-center items-center"
            : "p-[10px] bg-tertiary-300 rounded-3xl min-w-[200px] w-full min-h-[50px] justify-center items-center"
        }
      `}
      {...restProps}
    >
      {icon ? (
        icon
      ) : (
        <View className="flex w-full justify-center items-center">
          <Text className="text-base text-secondary-100 font-semibold block">
            {!loading ? title : <ActivityIndicator color="#fff" size="small" />}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonUI;
