import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type GroupState = {
  groups: Group[];
};

type GroupActions = {
  set: (groups: Group[]) => void;
  add: (group: Group) => void;
  updateSchedule: (schedules: Schedule[], groupID: number) => void;
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
        updateSchedule: (schedules, groupID) =>
          set((state) => {
            const groups = [...state.groups];

            const index = groups.findIndex((group) => group.id === groupID);

            const group = groups[index];

            if (group) {
              groups[index] = { ...group, schedules: schedules };

              return { groups: groups };
            }

            return { groups: groups };
          }),
      }),
      {
        name: "group-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
