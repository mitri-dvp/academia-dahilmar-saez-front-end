import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type GroupState = {
  groups: Group[];
};

type GroupActions = {
  set: (groups: Group[]) => void;
  add: (group: Group) => void;
};

type GroupStore = GroupState & GroupActions;

const initialState = {
  groups: [],
};

export const useGroupStore = create<GroupStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (groups) => set(() => ({ groups: groups })),
        add: (group) => set((state) => ({ groups: [...state.groups, group] })),
      }),
      {
        name: "group-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
