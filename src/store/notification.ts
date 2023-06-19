import Router from "next/router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type UserNotificationState = {
  notifications: UserNotification[];
};

type UserNotificationActions = {
  set: (notifications: UserNotification[]) => void;
  add: (notification: UserNotification) => void;
};

type UserNotificationStore = UserNotificationState & UserNotificationActions;

const initialState = {
  notifications: [],
};

export const useUserNotificationStore = create<UserNotificationStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set: (notifications) => set(() => ({ notifications: notifications })),
        add: (notification) =>
          set((state) => ({
            notifications: [...state.notifications, notification],
          })),
      }),
      {
        name: "notification-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
