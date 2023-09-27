import React from "react";
import { ActivityIndicator, View } from "react-native";
import GlobeIntro from "../../../assets/globe.svg";

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <GlobeIntro
        width={260}
        height={140}
        style={{ marginLeft: 10, marginBottom: 30 }}
      />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loading;
