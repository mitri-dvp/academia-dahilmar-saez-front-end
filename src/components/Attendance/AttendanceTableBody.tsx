import { useAttendanceStore } from "@store/attendance";
import type { Dayjs } from "dayjs";

import AttendanceTableBodyDay from "./AttendanceTableBodyDay";

const AttendanceTableBody: ({
  currentDate,
  initialDate,
}: {
  currentDate: Dayjs;
  initialDate: Dayjs;
}) => JSX.Element = ({ currentDate, initialDate }) => {
  const { attendances } = useAttendanceStore();

  const renderTableBody = () => {
    if (attendances.length === 0)
      return (
        <tbody>
          <tr>
            <td
              className="rounded-md border border-gray-300 px-2 py-5 text-center font-display text-2xl font-semibold uppercase"
              colSpan={8}
            >
              Asistencias no encontradas
            </td>
          </tr>
        </tbody>
      );

    const weeks: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      const week: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        const day = (
          <AttendanceTableBodyDay
            key={`${i}-${j}`}
            currentDate={currentDate}
            initialDate={initialDate}
          />
        );

        week.push(day);
        currentDate = currentDate.add(1, "day");
      }
      weeks.push(<tr key={currentDate.format("DD/MM/YYYY")}>{week}</tr>);
    }
    return <tbody>{weeks}</tbody>;
  };

  return <>{renderTableBody()}</>;
};

export default AttendanceTableBody;
