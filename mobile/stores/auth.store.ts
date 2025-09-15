import { UserModel } from "@/models/user.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token?: string;
  setToken: (token: string) => void;
  user?: UserModel;
  setUser: (user: UserModel) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token: string) => set({ token }),
      user: undefined,
      setUser: (user) => set({ user }),
      logout: () => set({ user: undefined, token: undefined }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
