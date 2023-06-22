import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import dayjs from "@utils/dayjs";

import {
  CheckCircleSVG,
  ChevronLeftSVG,
  ChevronRightSVG,
  CrossCircleSVG,
  SpinnerSVG,
} from "@components/SVG";

import { useAttendanceStore } from "@store/attendance";
import { get } from "@services/attendance";

const AttendanceAthlete: NextPage = () => {
  const { attendances } = useAttendanceStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const [initialDate, setInitialDate] = useState(dayjs());
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const calendarDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const calendarMonths = Array.from(Array(12));
  const calendarYears = Array.from(Array(80));

  const startDayOfMonth = initialDate.startOf("month").get("day");
  const startDate = initialDate
    .startOf("month")
    .subtract(startDayOfMonth, "day");

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
    setShowYearSelect(false);
  };

  const handleShowYearSelect = () => {
    setShowYearSelect(!showYearSelect);
    setShowMonthSelect(false);
  };

  const renderTableBody = () => {
    let currentDate = startDate;

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
        const dateMatch = attendances.filter(
          (attendance) =>
            dayjs(attendance.datetime).format("DD-MM-YYYY") ===
            dayjs(currentDate).format("DD-MM-YYYY")
        )[0];

        const isToday =
          dayjs().format("DD-MM-YYYY") ===
          dayjs(currentDate).format("DD-MM-YYYY");

        const isDateInMonth =
          dayjs(currentDate).get("month") === initialDate.get("month");

        const renderStatus = (status: boolean) => {
          if (status === true) {
            return <CheckCircleSVG className="h-8 w-8 text-secondary-500" />;
          }

          if (status === false) {
            return <CrossCircleSVG className="h-8 w-8 text-secondary-500" />;
          }
          return "\xA0";
        };

        const day = (
          <td
            key={currentDate.format("DD-MM-YYYY")}
            className="relative rounded-md border border-gray-300 p-12"
          >
            <div
              className={`absolute top-2 right-2 flex h-8 w-8 select-none items-center justify-center text-xs font-bold ${
                isToday
                  ? "block aspect-square rounded-full bg-secondary-500 text-white"
                  : ""
              } ${!isDateInMonth && !isToday ? "text-gray-300" : ""}`}
            >
              {currentDate.format("D")}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {dateMatch ? renderStatus(dateMatch.status) : "\xA0"}
            </div>
          </td>
        );

        week.push(day);
        currentDate = currentDate.add(1, "day");
      }
      weeks.push(<tr key={currentDate.format("DD/MM/YYYY")}>{week}</tr>);
    }
    return <tbody>{weeks}</tbody>;
  };

  return (
    <DashboardLayout>
      <Seo
        title="Asistencias | Academia Dahilmar Sáez"
        description="Asistencias | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="relative w-max bg-white p-16 shadow-lg">
          <div className="flex">
            <h1 className="ml-2 font-display text-6xl font-semibold uppercase">
              <div className="flex gap-4">
                <div className="cursor-pointer font-display font-semibold uppercase">
                  <span
                    className="transition-all hover:text-secondary-500"
                    onClick={handleShowMonthSelect}
                  >
                    {initialDate.format("MMMM")}
                  </span>
                  {showMonthSelect ? (
                    <div
                      ref={monthRef}
                      onBlur={() => setShowMonthSelect(false)}
                      className="absolute top-36 left-16 grid max-h-full w-[calc(100%-128px)] grid-cols-4 overflow-y-scroll border bg-white text-center shadow-sm"
                    >
                      <button autoFocus className="absolute" />
                      {calendarMonths.map((_, i) => (
                        <div
                          key={i}
                          className={`p-5 text-2xl transition-all hover:bg-gray-100 ${
                            initialDate.get("month") === i
                              ? "text-secondary-500"
                              : ""
                          }`}
                          onMouseDown={() => handleMonthSelect(i)}
                        >
                          {dayjs().set("month", i).format("MMMM").slice(0, 3)}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="cursor-pointer font-display font-semibold uppercase transition-all">
                  <span
                    className="transition-all hover:text-secondary-500"
                    onClick={handleShowYearSelect}
                  >
                    {initialDate.format("YYYY")}
                  </span>
                  {showYearSelect ? (
                    <div
                      ref={yearRef}
                      onBlur={() => setShowYearSelect(false)}
                      className="absolute top-36 left-16 grid max-h-full w-[calc(100%-128px)] grid-cols-4 overflow-y-scroll border bg-white text-center shadow-sm"
                    >
                      <button autoFocus className="absolute" />
                      {calendarYears.map((_, i) => (
                        <div
                          key={i}
                          className={`p-5 text-2xl transition-all hover:bg-gray-100 ${
                            initialDate.get("year") ===
                            dayjs().subtract(i, "years").get("year")
                              ? "text-secondary-500"
                              : ""
                          }`}
                          onMouseDown={() =>
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
            </h1>
            <div className="ml-auto flex items-center justify-center gap-2">
              <div onClick={handleDateDecrement}>
                <ChevronLeftSVG className="h-12 w-12 cursor-pointer text-secondary-500 transition-all hover:text-secondary-700" />
              </div>
              <div onClick={handleDateReset}>
                <span className="cursor-pointer font-display text-4xl font-semibold uppercase transition-all hover:text-secondary-500">
                  Hoy
                </span>
              </div>
              <div onClick={handleDateIncrement}>
                <ChevronRightSVG className="h-12 w-12 cursor-pointer text-secondary-500 transition-all hover:text-secondary-700" />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <table className="mt-8 w-full border-separate border-spacing-2 bg-white text-sm">
              <thead className="rounded-full text-white">
                <tr>
                  {calendarDays.map((day) => (
                    <th key={day} className="rounded-md bg-secondary-500 p-4">
                      <span className="select-none font-bold uppercase tracking-wide">
                        {day}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {renderTableBody()}
            </table>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AttendanceAthlete;
