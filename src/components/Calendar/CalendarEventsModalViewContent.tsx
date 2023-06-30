import React from "react";
import Button from "@components/Button";
import { CalendarSVG, CrossSVG, PencilSquareSVG } from "@components/SVG";

import { useUserStore } from "@store/user";
import dayjs from "@lib/dayjs";
import { USER_ROLES } from "@utils/global";
import EventDeleteButton from "@components/Button/EventDeleteButton";
import type { Dayjs } from "dayjs";

const CalendarEventsModalViewContent: ({
  events,
  currentDate,
  toggleEditing,
  toggleAdding,
  onClose,
}: {
  events: CalendarEvent[];
  currentDate: Dayjs;
  onClose: () => void;
  toggleEditing: (event: CalendarEvent | null) => void;
  toggleAdding: () => void;
}) => JSX.Element = ({
  events,
  currentDate,
  onClose,
  toggleEditing,
  toggleAdding,
}) => {
  const userStore = useUserStore();

  return (
    <React.Fragment>
      <div className="flex justify-end">
        <button onClick={onClose} type="button">
          <CrossSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
        </button>
      </div>
      <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
        Eventos
      </div>
      {events.length === 0 ? (
        <h1 className="text-center text-sm font-semibold text-dark-500">
          Eventos no encontrados
        </h1>
      ) : null}
      {events.map((event) => (
        <div key={event.id} className="flex gap-4 rounded-md  p-4  ">
          <CalendarSVG className="text-dark-500" />
          <div>
            <div className="font-semibold">{event.name}</div>
            <div>{event.description}</div>
            <div className="mt-1 text-sm capitalize text-gray-400">
              {dayjs(event.datetime).format("dddd DD [de] MMMM")}
            </div>
          </div>
          {userStore.user.role.type === USER_ROLES.TRAINER ? (
            <div className="ml-auto flex justify-end gap-4">
              <button onClick={() => toggleEditing(event)} type="button">
                <PencilSquareSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
              </button>
              <EventDeleteButton event={event} />
            </div>
          ) : null}
        </div>
      ))}
      {userStore.user.role.type === USER_ROLES.TRAINER ? (
        <Button onClick={toggleAdding} styles={"mx-auto mt-6"}>
          Agregar Evento
        </Button>
      ) : null}
    </React.Fragment>
  );
};

export default CalendarEventsModalViewContent;
