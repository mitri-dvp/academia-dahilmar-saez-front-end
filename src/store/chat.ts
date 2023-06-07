import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type ChatState = {
  chats: Chat[];
};

type ChatActions = {
  set: (chats: Chat[]) => void;
  add: (chat: Chat) => void;
};

type ChatStore = ChatState & ChatActions;

const initialState = {
  chats: [],
};

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (chats) => set(() => ({ chats: chats })),
        add: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
      }),
      {
        name: "chat-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
