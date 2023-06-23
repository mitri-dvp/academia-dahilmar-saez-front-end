import type { Dayjs } from "dayjs";
import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type CalendarEventState = {
  events: CalendarEvent[];
  currentEventDate?: Date;
};

type CalendarEventActions = {
  set: (events: CalendarEvent[]) => void;
  setCurrentEventDate: (date: Date) => void;
};

type CalendarEventStore = CalendarEventState & CalendarEventActions;

const initialState = {
  events: [],
  currentEventDate: undefined,
};

export const useEventStore = create<CalendarEventStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (events) => set(() => ({ events: events })),
        setCurrentEventDate: (date) => set(() => ({ currentEventDate: date })),
      }),
      {
        name: "event-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
