import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type AttendanceState = {
  attendances: Attendance[];
  groupAttendances: Attendance[];
};

type AttendanceActions = {
  set: (attendances: Attendance[]) => void;
  setGroupAttendances: (groupAttendances: Attendance[]) => void;
};

type AttendanceStore = AttendanceState & AttendanceActions;

const initialState = {
  attendances: [],
  groupAttendances: [],
};

export const useAttendanceStore = create<AttendanceStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (attendances) => set(() => ({ attendances: attendances })),
        setGroupAttendances: (groupAttendances) =>
          set(() => ({ groupAttendances: groupAttendances })),
      }),
      {
        name: "attendance-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
