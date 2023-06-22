import { publicApi } from "@lib/http";
import { useUserStore } from "@store/user";
import { useUserNotificationStore } from "@store/notification";

type RequestOptions = {
  signal: AbortSignal;
};

type NotificationData = {
  read: boolean;
};

export const get = async (options: RequestOptions) => {
  const getResponse = await publicApi.get<{
    notifications: UserNotification[];
  }>(`/notifications`, {
    headers: { Authorization: "Bearer " + useUserStore.getState().token },
    signal: options.signal,
  });

  const { notifications } = getResponse.data;

  useUserNotificationStore.getState().set(notifications);
};

export const read = async (
  notificationID: number,
  notificationData: NotificationData
) => {
  const deleteResponse = await publicApi.put<{
    notifications: UserNotification[];
  }>(
    `/notifications/${notificationID}`,
    {
      data: notificationData,
    },
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { notifications } = deleteResponse.data;

  useUserNotificationStore.getState().set(notifications);
};

export const deleteNotification = async (notificationID: number) => {
  const deleteResponse = await publicApi.delete<{
    notifications: UserNotification[];
  }>(`/notifications/${notificationID}`, {
    headers: { Authorization: "Bearer " + useUserStore.getState().token },
  });

  const { notifications } = deleteResponse.data;

  useUserNotificationStore.getState().set(notifications);
};
