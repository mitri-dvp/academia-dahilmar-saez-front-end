import { useState } from "react";

import dayjs from "@lib/dayjs";
import { useEventStore } from "@store/event";
import CalendarEvents from "@components/Calendar/CalendarEvents";
import CalendarEventsModal from "@components/Calendar/CalendarEventsModal";

const CalendarDay: ({
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

  const handleDaySelect = () => setShowModal(true);

  return (
    <>
      <td
        className={`md:px relative cursor-pointer rounded-md border border-gray-300 p-8 px-12 transition-all hover:bg-gray-100 md:py-12 md:px-16`}
        onClick={handleDaySelect}
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
            <CalendarEvents events={eventsMatch} />
          ) : (
            "\xA0"
          )}
        </div>
      </td>
      {showModal ? (
        <CalendarEventsModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          events={eventsMatch}
          currentDate={currentDate}
        />
      ) : null}
    </>
  );
};

export default CalendarDay;
