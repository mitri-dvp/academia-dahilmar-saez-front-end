import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type GroupState = {
  groups: Group[];
  selectedGroup: Group | null;
};

type GroupActions = {
  set: (groups: Group[]) => void;
  add: (group: Group) => void;
  setSelected: (group: Group | null) => void;
  update: (groupID: number, group: Group) => void;
  updateSchedule: (groupID: number, schedules: Schedule[]) => void;
};

type GroupStore = GroupState & GroupActions;

const initialState = {
  groups: [],
  selectedGroup: null,
};

export const useGroupStore = create<GroupStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (groups) => set(() => ({ groups: groups })),
        add: (group) => set((state) => ({ groups: [...state.groups, group] })),
        setSelected: (group) => set(() => ({ selectedGroup: group })),
        update: (groupID, group) =>
          set((state) => {
            const groups = [...state.groups];

            const index = groups.findIndex((group) => group.id === groupID);

            groups[index] = { ...group };

            return { groups: groups };
          }),
        updateSchedule: (groupID, schedules) =>
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
