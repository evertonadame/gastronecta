import React, { useMemo } from "react";
import { useStorageState } from "./useStorageState";
import { api } from "../lib/axios";
import { router } from "expo-router";

const AuthContext = React.createContext<{
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
} | null>(null);
// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      await setSession(data.id);

      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await setSession(null);
    router.push("/auth");
  };

  const authCotenxtValue = useMemo(
    () => ({
      signIn,
      signOut,
      session,
      isLoading,
    }),
    []
  );

  return (
    <AuthContext.Provider value={authCotenxtValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
