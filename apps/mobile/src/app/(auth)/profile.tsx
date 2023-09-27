import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { Button, View } from "react-native";

const Profile = () => {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Button
        onPress={() => {
          signOut();
        }}
        title="Sair"
      />
    </View>
  );
};

export default Profile;
