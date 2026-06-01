import { create } from "zustand";

export const useAuth = create((set) => ({
  loading: true,

  user: null,

  set,
}))