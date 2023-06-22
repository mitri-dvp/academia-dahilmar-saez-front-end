import { useState, useRef } from "react";

import dayjs from "@lib/dayjs";
import { ChevronLeftSVG, ChevronRightSVG } from "@components/SVG";

const DateInput: ({
  selectedDate,
  onChange,
  onClear,
}: {
  selectedDate?: Date;
  onChange: (day: Date) => void;
  onClear: () => void;
}) => JSX.Element = ({ selectedDate, onChange, onClear }) => {
  const [initialDate, setInitialDate] = useState(
    dayjs(selectedDate).isValid() ? dayjs(selectedDate) : dayjs()
  );
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  let currentDate = initialDate
    .startOf("month")
    .startOf("week")
    .subtract(2, "days");

  const weeks = Array.from(Array(6));
  const days = Array.from(Array(7));

  const calendarDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const calendarMonths = Array.from(Array(12));
  const calendarYears = Array.from(Array(80));

  const handleDateReset = () => {
    setInitialDate(dayjs());
  };
  const handleDateIncrement = () => {
    setInitialDate(initialDate.add(1, "month"));
  };
  const handleDateDecrement = () => {
    setInitialDate(initialDate.subtract(1, "month"));
  };
  const handleMonthSelect = (i: number) => {
    setInitialDate(initialDate.set("month", i));
    setShowMonthSelect(false);
  };
  const handleYearSelect = (year: number) => {
    setInitialDate(initialDate.set("year", year));
    setShowYearSelect(false);
  };

  const handleShowMonthSelect = () => {
    setShowMonthSelect(!showMonthSelect);
    if (!showMonthSelect) {
      setTimeout(() => {
        if (monthRef.current) {
          monthRef.current.scrollTo({
            top: 44 * initialDate.get("month"),
            behavior: "instant",
          });
        }
      }, 0);
    }
    setShowYearSelect(false);
  };

  const handleShowYearSelect = () => {
    setShowYearSelect(!showYearSelect);
    if (!showMonthSelect) {
      setTimeout(() => {
        if (yearRef.current) {
          const n = dayjs().get("year") - initialDate.get("year");
          yearRef.current.scrollTo({
            top: 44 * n,
            behavior: "instant",
          });
        }
      }, 0);
    }
    setShowMonthSelect(false);
  };

  return (
    <div className="absolute bottom-0 z-50 translate-y-full">
      <div className="animate-fade-down bg-white animate-duration-200">
        <div className="absolute -mt-2 ml-[1.2rem] h-4 w-4 rotate-45 border-l border-t border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800" />
        <div className="mt-2.5 border border-gray-300 bg-white p-2.5">
          <div className="mb-1 flex justify-center">
            <div className="flex w-full items-center justify-between gap-2">
              <div onClick={handleDateDecrement}>
                <ChevronLeftSVG className="h-6 w-6 cursor-pointer text-secondary-500" />
              </div>
              <div className="flex gap-1">
                <div className="cursor-pointer font-display font-semibold uppercase transition-all">
                  <span
                    className="hover:text-secondary-500"
                    onClick={handleShowMonthSelect}
                  >
                    {initialDate.format("MMMM")}
                  </span>
                  {showMonthSelect ? (
                    <div
                      ref={monthRef}
                      className="absolute top-10 -left-0 max-h-full w-full overflow-y-scroll border border-t-0 bg-white text-center shadow-sm"
                    >
                      {calendarMonths.map((_, i) => (
                        <div
                          key={i}
                          className={`px-5 py-2.5 transition-all hover:bg-gray-100 ${
                            initialDate.get("month") === i
                              ? "text-secondary-500"
                              : ""
                          }`}
                          onClick={() => handleMonthSelect(i)}
                        >
                          {dayjs().set("month", i).format("MMMM").slice(0, 3)}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="cursor-default font-display font-semibold uppercase">
                  de
                </div>
                <div className="cursor-pointer font-display font-semibold uppercase transition-all">
                  <span
                    className="hover:text-secondary-500"
                    onClick={handleShowYearSelect}
                  >
                    {initialDate.format("YYYY")}
                  </span>
                  {showYearSelect ? (
                    <div
                      ref={yearRef}
                      className="absolute top-10 -left-0 max-h-full w-full overflow-y-scroll border border-t-0 bg-white text-center shadow-sm"
                    >
                      {calendarYears.map((_, i) => (
                        <div
                          key={i}
                          className={`px-5 py-2.5 transition-all hover:bg-gray-100 ${
                            initialDate.get("year") ===
                            dayjs().subtract(i, "years").get("year")
                              ? "text-secondary-500"
                              : ""
                          }`}
                          onClick={() =>
                            handleYearSelect(
                              dayjs().subtract(i, "years").get("year")
                            )
                          }
                        >
                          {dayjs().subtract(i, "years").format("YYYY")}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div onClick={handleDateIncrement}>
                <ChevronRightSVG className="h-6 w-6 cursor-pointer text-secondary-500" />
              </div>
            </div>
          </div>
          <table className="border-separate border-spacing-0.5">
            <thead>
              <tr>
                {calendarDays.map((day) => (
                  <th
                    key={day}
                    className="rounded-md bg-secondary-500 p-1 text-xs text-white"
                  >
                    <span className="select-none font-bold tracking-wide">
                      {day}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((_, i) => {
                return (
                  <tr key={currentDate.format("DD/MM/YYYY") + i}>
                    {days.map((_, j) => {
                      currentDate = currentDate.add(1, "day");
                      const isInMonth =
                        initialDate.get("month") === currentDate.get("month");
                      const isToday =
                        dayjs().format("DD/MM/YYYY") ===
                        currentDate.format("DD/MM/YYYY");
                      const matchDay =
                        dayjs().format("DD") === currentDate.format("DD");
                      return (
                        <td
                          key={currentDate.format("DD/MM/YYYY")}
                          data-date={currentDate.format()}
                          className={`h-8 w-8 cursor-pointer rounded-full border-2 border-transparent p-1 text-center text-sm transition-all ${
                            !isInMonth ? "text-gray-400" : ""
                          } ${
                            isToday
                              ? "bg-secondary-500 text-white hover:bg-secondary-700"
                              : "hover:bg-gray-100"
                          } ${matchDay && !isToday ? "border-gray-400" : ""}`}
                          onClick={(e) => {
                            const target = e.target as HTMLTableCellElement;
                            onChange(dayjs(target.dataset.date).toDate());
                          }}
                        >
                          {currentDate.format("D")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-1 flex justify-center">
            <div className="flex w-full items-center justify-between gap-2">
              <div onClick={onClear}>
                <span className="cursor-pointer font-display font-semibold uppercase transition-all hover:text-secondary-500">
                  Limpiar
                </span>
              </div>
              <div onClick={handleDateReset}>
                <span className="cursor-pointer font-display font-semibold uppercase transition-all hover:text-secondary-500">
                  Hoy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateInput;
