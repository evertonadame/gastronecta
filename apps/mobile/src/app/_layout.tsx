import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { ReactQueryProvider } from "../context/reactQueryProvider";
import Toast from "react-native-toast-message";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, token: string) {
    try {
      return SecureStore.setItemAsync(key, token);
    } catch (error) {
      return null;
    }
  },
};

const InitialLayout = () => {
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
    <ReactQueryProvider>
      <Slot />
      <Toast />
    </ReactQueryProvider>
  );
};

export default function Root() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
