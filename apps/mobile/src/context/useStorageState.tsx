import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, undefined]
): UseStateHook<T> {
  const [value, setValue] = React.useState<T | null>(initialValue[1]);
  const [isLoading, setIsLoading] = React.useState<boolean>(initialValue[0]);

  const setter = React.useCallback(
    (x: T | null) => {
      setValue(x);
      setIsLoading(false);
    },
    [setValue, setIsLoading]
  );

  return [[isLoading, value], setter];
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string | null>([true, null]);

  // Get
  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          const storedValue = localStorage.getItem(key);
          setState(storedValue);
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key)
        .then((value) => {
          setState(value); // Defina o estado de carregamento como false e o valor do SecureStore
        })
        .catch((error) => {
          console.error("Error retrieving value from SecureStore:", error);
        });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    async (value: string | null) => {
      await setStorageItemAsync(key, value).then(() => {
        console.log(
          "🚀 ~ file: useStorageState.tsx:74 ~ setStorageItemAsync ~ value:",
          value
        );
        setState(value);
      });
    },
    [key]
  );

  console.log(state);

  return [state, setValue];
}
