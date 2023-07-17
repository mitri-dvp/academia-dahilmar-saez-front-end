import { useEffect } from "react";
import Notifications from "@components/Popover/Notifications";
import { BellSVG } from "@components/SVG";

import { useState } from "react";

import { useToastStore } from "@store/toast";
import { useUserNotificationStore } from "@store/notification";
import { socket } from "@lib/socket";
import { useUserStore } from "@store/user";
import { useRouter } from "next/router";
import { get } from "@services/notification";
import NotificationItem from "@components/Notification/NotificationItem";
import Button from "@components/Button";

const NotificationsButton = () => {
  const { addToast } = useToastStore();
  const { notifications, add } = useUserNotificationStore();
  const { user } = useUserStore();

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  );

  const router = useRouter();

  const [showAll, setShowAll] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 3;

  useEffect(() => {
    const onNotification = (notification: UserNotification) => {
      add(notification);
    };

    const event = `NOTIFICATION::${user.id}`;
    socket.on(event, onNotification);
    return () => {
      socket.off(event, onNotification);
    };
  }, [user.id]);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    get({
      signal: abortController.signal,
    })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));

    return () => {
      abortController.abort();
    };
  }, [router.asPath]);

  useEffect(() => {
    return () => {
      if (!showConfirm) setShowAll(false);
    };
  }, [showConfirm]);

  return (
    <Notifications
      open={showConfirm}
      isLoading={isLoading}
      onClose={() => setShowConfirm(false)}
      trigger={
        <div className="relative ml-auto shrink-0">
          {showConfirm ? (
            <main>
              {unreadNotifications.length ? (
                <div className="absolute right-0 top-0 flex min-h-[20px] min-w-[20px] translate-x-2.5 -translate-y-2.5 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full border-[1.5px] border-white bg-red-700 px-0.5">
                  <div className="text-xs font-bold text-white">
                    {unreadNotifications.length}
                  </div>
                </div>
              ) : null}
              <BellSVG className="h-6 w-6 cursor-pointer text-secondary-500" />
            </main>
          ) : (
            <div onClick={() => setShowConfirm(true)}>
              {unreadNotifications.length ? (
                <div className="absolute right-0 top-0 flex min-h-[20px] min-w-[20px] translate-x-2.5 -translate-y-2.5 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full border-[1.5px] border-white bg-red-700 px-0.5">
                  <div className="text-xs font-bold text-white">
                    {unreadNotifications.length}
                  </div>
                </div>
              ) : null}
              <BellSVG className="h-6 w-6 cursor-pointer text-dark-500" />
            </div>
          )}
        </div>
      }
      content={
        <>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-xs font-semibold text-dark-500 md:text-sm">
              Notificaciones no encontradas
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications
                .slice(0, showAll ? undefined : limit)
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              {notifications.length > 3 && !showAll ? (
                <div
                  className="block cursor-pointer border-2 border-secondary-500 bg-secondary-500 px-5 py-2 text-center font-display font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-700"
                  onClick={() => setShowAll(true)}
                >
                  Mostrar Todos
                </div>
              ) : null}
            </div>
          )}
        </>
      }
    />
  );
};

export default NotificationsButton;
