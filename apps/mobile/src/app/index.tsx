import { View } from "react-native";
import Loading from "../components/alpha/Loading";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

const StartPage = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const isTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !isTabsGroup) {
      router.push("/home");
    } else if (!isSignedIn) {
      router.push("/login");
    }
  }, [isSignedIn, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Loading />
    </View>
  );
};

export default StartPage;
