import type dayjs from "@lib/dayjs";

import CalendarDay from "@components/Calendar/CalendarDay";

const CalendarTableBody: ({
  initialDate,
}: {
  initialDate: dayjs.Dayjs;
}) => JSX.Element = ({ initialDate }) => {
  const startDayOfMonth = initialDate.startOf("month").get("day");

  let currentDate = initialDate
    .startOf("month")
    .subtract(startDayOfMonth, "day")
    .subtract(1, "day");

  const weeks = Array.from(Array(6));
  const days = Array.from(Array(7));

  return (
    <tbody>
      {weeks.map((_, i) => {
        return (
          <tr key={currentDate.format("DD/MM/YYYY") + i}>
            {days.map((_, j) => {
              currentDate = currentDate.add(1, "day");
              return (
                <CalendarDay
                  key={currentDate.format("DD/MM/YYYY") + j}
                  initialDate={initialDate}
                  currentDate={currentDate}
                />
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default CalendarTableBody;
