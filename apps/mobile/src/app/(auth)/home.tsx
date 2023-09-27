import { Image, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import images from "../../images";
import ButtonUI from "../../components/Button";
import ScrollTabs from "../../components/ScrollTabs";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { user } = useUser();

  return (
    <View className="flex 1">
      <LinearGradient
        start={[0.3, 0.6]}
        end={[0.1, 1]}
        colors={["#131313", "#313131"]}
        className="flex 1 pt-16 px-7 h-[270px]"
      >
        <View className="flex 1 flex-row justify-between">
          <View>
            <Text className="text-xs text-secondary-100">
              {user?.emailAddresses[0].emailAddress}
            </Text>
            <Text className="text-lg text-secondary-100">
              {user?.firstName}, {user?.lastName}
            </Text>
          </View>
          <View>
            <Image
              source={{
                uri: user?.imageUrl,
              }}
              className="h-11 w-11 rounded-2xl bg-primary-400"
            />
          </View>
        </View>
        <View className="mt-7 h-[52px] rounded-xl pr-1 pl-5 bg-primary-500 flex flex-row justify-between items-center">
          <MaterialIcons name="search" size={28} color="white" />
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor={"#989898"}
            className="placeholder:text-sm  text-secondary-100 w-[70%] h-full"
          />
          <ButtonUI
            icon={<MaterialIcons name="tune" size={28} color="white" />}
          />
        </View>
      </LinearGradient>
      <View className="px-7 -mt-10 relative">
        <View className="bg-quaternary-100 absolute z-10 top-4 left-10 p-2 rounded-xl">
          <Text className=" text-secondary-100">Promo</Text>
        </View>
        <Image source={images["coffe"]} className="h-[160px] rounded-xl" />
        <View className="absolute z-10 top-16  left-11">
          <Text className=" text-secondary-100 font-semibold text-3xl">
            Buy one get
          </Text>
          <Text className=" text-secondary-100 font-semibold text-3xl">
            one Free
          </Text>
        </View>
      </View>
      <View className="px-7 mt-5">
        <ScrollTabs />
      </View>
    </View>
  );
}
