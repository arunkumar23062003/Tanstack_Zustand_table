import { UserData } from "@/types";
import { create } from "zustand";

var user: UserData | null = null;

export const useStore = create((set) => ({
  user: user, // Object value with initial properties
  setUser: (user: any) => set({ user }),
  removeUser: (user: any) => set({ user: null }), // Action to update user object
}));
