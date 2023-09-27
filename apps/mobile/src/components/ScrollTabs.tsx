import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";

const tabs = [
  {
    name: "Bares",
    selected: true,
  },
  {
    name: "Restaurantes",
    selected: false,
  },
  {
    name: "Cafeterias",
    selected: false,
  },
  {
    name: "Padarias",
    selected: false,
  },
];

const ScrollTabs = () => {
  return (
    <ScrollView className="flex flex-row w-full gap-2" horizontal>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          className={`${
            tab.selected ? "bg-tertiary-300" : "bg-secondary-200"
          } p-4 rounded-xl`}
        >
          <Text
            className={`font-semibold ${
              tab.selected ? "text-secondary-100" : "text-primary-200"
            }`}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ScrollTabs;
