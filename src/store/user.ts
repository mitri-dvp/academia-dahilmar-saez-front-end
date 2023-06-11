import { socket } from "@lib/socket";
import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  user: User;
  token: string;
};

type UserActions = {
  signup: (token: string, user: User) => void;
  login: (token: string, user: User) => void;
  edit: (user: User) => void;
  editPhoto: (photo: UserPhoto) => void;
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
        signup: (token, user) => set({ token: token, user: user }),
        login: (token, user) => set({ token: token, user: user }),
        edit: (user) => set(() => ({ user: user })),
        editPhoto: (photo) =>
          set((state) => ({ user: { ...state.user, photo } })),
        logout: async () => {
          socket.disconnect();
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
