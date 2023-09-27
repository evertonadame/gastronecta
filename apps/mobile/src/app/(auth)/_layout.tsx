import { Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppLayout() {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      backBehavior="none"
      sceneContainerStyle={{
        backgroundColor: "#FFFFFF",
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginBottom: 15,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 90,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="home-variant"
              color={focused ? "#C67C4E" : color}
              size={30}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="heart-half-full"
              color={focused ? "#C67C4E" : color}
              size={30}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? "#C67C4E" : color}
              size={30}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Informaçoẽs",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="bell"
              color={focused ? "#C67C4E" : color}
              size={30}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
}
