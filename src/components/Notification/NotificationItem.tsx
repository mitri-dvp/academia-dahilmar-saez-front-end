import { useState } from "react";
import { entityToIcon } from "@utils/global";
import dayjs from "@utils/dayjs";
import React from "react";
import {
  CheckCircleFillSVG,
  ThreeDotsSVG,
  TrashFillSVG,
} from "@components/SVG";
import { deleteNotification, read } from "@services/notification";
import { useToastStore } from "@store/toast";

const NotificationItem: ({
  notification,
}: {
  notification: UserNotification;
}) => JSX.Element = ({ notification }) => {
  const { addToast } = useToastStore();
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRead = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await read(notification.id, {
        read: true,
      });
      addToast({
        title: "Notificación marcada como leida",
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await deleteNotification(notification.id);

      addToast({
        title: "Notificación Eliminada",
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex cursor-default items-center gap-4 p-4 hover:bg-gray-100">
      <div className="w-2 flex-shrink-0">
        {notification.read ? (
          <div className="h-2 w-2 rounded-full bg-transparent" />
        ) : (
          <div className="h-2 w-2 rounded-full bg-secondary-500" />
        )}
      </div>
      <div className="w-6 flex-shrink-0">
        {entityToIcon(notification.entity, "w-6 h-6")}
      </div>
      <div className="mr-3 text-sm">
        <span className="line-clamp-2">
          {notification.message} Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Soluta asperiores vitae iusto rem sit omnis facere,
          at, voluptates voluptatem recusandae explicabo nemo qui quod repellat
          nobis odio! Recusandae, illo temporibus.
        </span>
        <span className="mt-1 text-xs text-secondary-500 line-clamp-1">
          {dayjs(notification.createdAt).fromNow()}
        </span>
      </div>

      <div className="absolute right-4 w-4 flex-shrink-0 cursor-pointer">
        <div onClick={() => setShowOptions(!showOptions)}>
          <ThreeDotsSVG className="h-4 w-4 text-secondary-500" />
        </div>
        {showOptions ? (
          <div className="absolute -right-2 -bottom-2 w-48 translate-y-full bg-white p-0.5">
            <div
              onClick={handleRead}
              className="flex cursor-pointer items-center gap-1 p-2 hover:bg-gray-100"
            >
              <CheckCircleFillSVG className="h-4 w-4 flex-shrink-0 text-secondary-500" />{" "}
              <span className="text-sm">Marcar como leído</span>
            </div>
            <div
              onClick={handleDelete}
              className="flex cursor-pointer items-center gap-1 p-2 hover:bg-gray-100"
            >
              <TrashFillSVG className="h-4 w-4 flex-shrink-0 text-secondary-500" />{" "}
              <span className="text-sm">Elminiar mensaje</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NotificationItem;
