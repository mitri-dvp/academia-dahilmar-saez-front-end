import { useEffect, useState } from "react";
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

  const renderTableBody = () => {
    let currentDate = startDate;
    const weeks: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      const week: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        const dateMatch = attendances.filter(
          (attendance) =>
            dayjs(attendance.date).format("DD-MM-YYYY") ===
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
        title="Panel | Academia Dahilmar Sáez"
        description="Panel | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="w-max bg-white p-16 shadow-lg">
          <div className="flex">
            <h1 className="ml-2 font-display text-6xl font-semibold uppercase">
              {initialDate.format("MMMM YYYY")}
            </h1>
            <div className="ml-auto flex items-center justify-center gap-2">
              <div onClick={handleDateDecrement}>
                <ChevronLeftSVG className="h-12 w-12 cursor-pointer text-secondary-500" />
              </div>
              <div onClick={handleDateReset}>
                <span className="cursor-pointer font-display text-4xl font-semibold uppercase">
                  Hoy
                </span>
              </div>
              <div onClick={handleDateIncrement}>
                <ChevronRightSVG className="h-12 w-12 cursor-pointer text-secondary-500" />
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
                  <th className="rounded-md bg-secondary-500 p-4">
                    <span className="select-none font-bold uppercase tracking-wide">
                      Domingo
                    </span>
                  </th>
                  <th className="rounded-md bg-secondary-500 p-4">
                    <span className="select-none font-bold uppercase tracking-wide">
                      Lunes
                    </span>
                  </th>
                  <th className="rounded-md bg-secondary-500 p-4">
                    <span className="select-none font-bold uppercase tracking-wide">
                      Martes
                    </span>
                  </th>
                  <th className="rounded-md bg-secondary-500 p-4">
                    <span className="select-none font-bold uppercase tracking-wide">
                      Miercoles
                    </span>
                  </th>
                  <th className="rounded-md bg-secondary-500 p-4">
                    <span className="select-none font-bold uppercase tracking-wide">
                      Jueves
                    </span>
                  </th>
                  <th className="rounded-md bg-secondary-500 p-4">
                    <span className="select-none font-bold uppercase tracking-wide">
                      Viernes
                    </span>
                  </th>
                  <th className="rounded-md bg-secondary-500 p-4">
                    <span className="select-none font-bold uppercase tracking-wide">
                      Sabado
                    </span>
                  </th>
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
