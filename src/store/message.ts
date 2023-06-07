import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type MessageState = {
  messages: Message[];
};

type MessageActions = {
  set: (messages: Message[]) => void;
  add: (message: Message) => void;
};

type MessageStore = MessageState & MessageActions;

const initialState = {
  messages: [],
};

export const useMessageStore = create<MessageStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (messages) => set(() => ({ messages: messages })),
        add: (message) =>
          set((state) => ({ messages: [...state.messages, message] })),
      }),
      {
        name: "message-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
