import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import dayjs from "@lib/dayjs";

import { ChevronLeftSVG, ChevronRightSVG, SpinnerSVG } from "@components/SVG";

import { get } from "@services/event";
import CalendarTableBody from "@components/Calendar/CalendarTableBody";

const Calendar: NextPage = () => {
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
  const calendarYears = Array.from(Array(90));

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

  return (
    <DashboardLayout>
      <Seo
        title="Calendario | Academia Dahilmar Sáez"
        description="Calendario | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-white p-4 py-8 md:py-14 md:px-8">
        <div className="relative">
          <div className="flex">
            <h1 className="ml-2 font-display text-2xl font-semibold uppercase md:text-6xl">
              <div className="flex gap-2 md:gap-4">
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
                      className="absolute top-12 left-1 z-10 grid max-h-full w-full grid-cols-4 overflow-y-scroll border bg-white text-center shadow-sm md:left-2 md:top-20"
                    >
                      <button autoFocus className="absolute" />
                      {calendarMonths.map((_, i) => (
                        <div
                          key={i}
                          className={`p-5 text-lg transition-all hover:bg-gray-100 md:text-2xl ${
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
                      className="absolute top-12 left-1 z-10 grid max-h-full w-full grid-cols-4 overflow-y-scroll border bg-white text-center shadow-sm md:left-2 md:top-20"
                    >
                      <button autoFocus className="absolute" />
                      {calendarYears.map((_, i) => {
                        const currentYear = dayjs().subtract(i - 10, "years");
                        return (
                          <div
                            key={i}
                            className={`p-5 text-lg transition-all hover:bg-gray-100 md:text-2xl ${
                              initialDate.get("year") ===
                              currentYear.get("year")
                                ? "text-secondary-500"
                                : ""
                            }`}
                            onMouseDown={() =>
                              handleYearSelect(currentYear.get("year"))
                            }
                          >
                            {currentYear.format("YYYY")}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </h1>
            <div className="ml-auto flex items-center justify-center gap-2">
              <div onClick={handleDateDecrement}>
                <ChevronLeftSVG className="h-6 w-6 cursor-pointer text-secondary-500 transition-all hover:text-secondary-700 md:h-12 md:w-12" />
              </div>
              <div onClick={handleDateReset}>
                <span className="cursor-pointer font-display text-lg font-semibold uppercase transition-all hover:text-secondary-500 md:text-4xl">
                  Hoy
                </span>
              </div>
              <div onClick={handleDateIncrement}>
                <ChevronRightSVG className="h-6 w-6 cursor-pointer text-secondary-500 transition-all hover:text-secondary-700 md:h-12 md:w-12" />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="mt-4 w-full border-separate border-spacing-1 bg-white text-xs md:mt-8 md:border-spacing-2 md:text-sm">
                <thead className="rounded-full text-white">
                  <tr>
                    {calendarDays.map((day) => (
                      <th
                        key={day}
                        className="rounded-md bg-secondary-500 px-1 py-4 md:p-4"
                      >
                        <span className="select-none font-bold uppercase tracking-wide">
                          {day}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <CalendarTableBody initialDate={initialDate} />
              </table>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Calendar;
