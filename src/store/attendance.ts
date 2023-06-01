import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type AttendanceState = {
  attendances: Attendance[];
};

type AttendanceActions = {
  set: (attendances: Attendance[]) => void;
};

type AttendanceStore = AttendanceState & AttendanceActions;

const initialState = {
  attendances: [],
};

export const useAttendanceStore = create<AttendanceStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (attendances) => set(() => ({ attendances: attendances })),
      }),
      {
        name: "attendance-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
