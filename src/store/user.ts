import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  user: User;
  token: string;
};

type UserActions = {
  login: (token: string, user: User) => void;
  signup: (token: string, user: User) => void;
  logout: () => void;
};

type UserStore = UserState & UserActions;

const initialState = {
  user: {
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    documentID: "",
    dateOfBirth: "",
    provider: "",
    createdAt: "",
    updatedAt: "",
    role: {
      id: 0,
      type: "",
      createdAt: "",
      updatedAt: "",
    },
    photo: null,
  },
  token: "",
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        login: (token, user) => set({ token: token, user: user }),
        signup: (token, user) => set({ token: token, user: user }),
        logout: async () => {
          await Router.push("/login");
          set(initialState);
        },
      }),
      {
        name: "user-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
