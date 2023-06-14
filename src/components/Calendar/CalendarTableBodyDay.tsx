import { useState } from "react";

import dayjs from "@utils/dayjs";

import { useEventStore } from "@store/event";
import CalendarTableBodyEvents from "./CalendarTableBodyEvents";
import CalendarTableBodyEventsModal from "./CalendarTableBodyEventsModal";

const CalendarTableBodyDay: ({
  initialDate,
  currentDate,
}: {
  initialDate: dayjs.Dayjs;
  currentDate: dayjs.Dayjs;
}) => JSX.Element = ({ initialDate, currentDate }) => {
  const { events } = useEventStore();

  const [showModal, setShowModal] = useState(false);

  const eventsMatch = events.filter(
    (event) =>
      dayjs(event.datetime).format("DD-MM-YYYY") ===
      dayjs(currentDate).format("DD-MM-YYYY")
  );

  const isToday =
    dayjs().format("DD-MM-YYYY") === dayjs(currentDate).format("DD-MM-YYYY");

  const isDateInMonth =
    dayjs(currentDate).get("month") === initialDate.get("month");

  return (
    <>
      <td
        className={`relative rounded-md border border-gray-300 py-12 px-16 transition-all ${
          eventsMatch.length ? "cursor-pointer hover:bg-gray-100" : ""
        }`}
        onClick={eventsMatch.length ? () => setShowModal(true) : undefined}
      >
        <div
          className={`absolute top-2 right-2 flex h-7 w-7 select-none items-center justify-center text-xs font-bold ${
            isToday
              ? "block aspect-square rounded-full bg-secondary-500 text-white"
              : ""
          } ${!isDateInMonth && !isToday ? "text-gray-300" : ""}`}
        >
          {currentDate.format("D")}
        </div>
        <div className="absolute top-9 left-0">
          {eventsMatch.length ? (
            <CalendarTableBodyEvents events={eventsMatch} />
          ) : (
            "\xA0"
          )}
        </div>
      </td>
      {showModal ? (
        <CalendarTableBodyEventsModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          events={eventsMatch}
        />
      ) : null}
    </>
  );
};

export default CalendarTableBodyDay;
