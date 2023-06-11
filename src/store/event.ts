import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type CalendarEventState = {
  events: CalendarEvent[];
};

type CalendarEventActions = {
  set: (events: CalendarEvent[]) => void;
};

type CalendarEventStore = CalendarEventState & CalendarEventActions;

const initialState = {
  events: [],
};

export const useEventStore = create<CalendarEventStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (events) => set(() => ({ events: events })),
      }),
      {
        name: "event-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
