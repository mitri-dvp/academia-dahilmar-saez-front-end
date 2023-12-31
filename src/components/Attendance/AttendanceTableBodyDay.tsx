import type { Dayjs } from "dayjs";
import dayjs from "@lib/dayjs";
import { CheckCircleFillSVG, CrossCircleFillSVG } from "@components/SVG";
import { useAttendanceStore } from "@store/attendance";
import { useState } from "react";
import AttendanceTableBodyDayModal from "./AttendanceTableBodyDayModal";

const AttendanceTableBodyDay: ({
  currentDate,
  initialDate,
}: {
  currentDate: Dayjs;
  initialDate: Dayjs;
}) => JSX.Element = ({ currentDate, initialDate }) => {
  const { attendances } = useAttendanceStore();

  const [showModal, setShowModal] = useState(false);

  const attendance = attendances.find(
    (attendance) =>
      dayjs(attendance.datetime).format("DD-MM-YYYY") ===
      dayjs(currentDate).format("DD-MM-YYYY")
  );

  const isToday =
    dayjs().format("DD-MM-YYYY") === dayjs(currentDate).format("DD-MM-YYYY");

  const isDateInMonth =
    dayjs(currentDate).get("month") === initialDate.get("month");

  const renderStatus = (status: boolean) => {
    if (status === true) {
      return (
        <CheckCircleFillSVG className="h-6 w-6 text-secondary-500 md:h-8 md:w-8" />
      );
    }

    if (status === false) {
      return (
        <CrossCircleFillSVG className="h-6 w-6 text-secondary-500 md:h-8 md:w-8" />
      );
    }
    return "\xA0";
  };

  return (
    <>
      <td
        key={currentDate.format("DD-MM-YYYY")}
        className={`relative rounded-md border border-gray-300 p-8 md:p-12 ${
          attendance ? "cursor-pointer transition-all hover:bg-gray-100" : ""
        }`}
        onClick={attendance ? () => setShowModal(true) : undefined}
      >
        <div
          className={`absolute top-0.5 right-0.5 flex h-6 w-6 select-none items-center justify-center text-xs font-bold md:top-2 md:right-2 md:h-8 md:w-8 ${
            isToday
              ? "block aspect-square rounded-full bg-secondary-500 text-white"
              : ""
          } ${!isDateInMonth && !isToday ? "text-gray-300" : ""}`}
        >
          {currentDate.format("D")}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {attendance ? renderStatus(attendance.status) : "\xA0"}
        </div>
      </td>
      {showModal && attendance ? (
        <AttendanceTableBodyDayModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          attendance={attendance}
        />
      ) : null}
    </>
  );
};

export default AttendanceTableBodyDay;
