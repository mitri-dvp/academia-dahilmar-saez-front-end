import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import dayjs from "@lib/dayjs";

import { SpinnerSVG } from "@components/SVG";

import { useGroupStore } from "@store/group";
import { get } from "@services/group";
import ScheduleTableBody from "@components/Schedule/ScheduleTableBody";

const Schedule: NextPage = () => {
  const { groups } = useGroupStore();

  const [isLoading, setIsLoading] = useState(true);
  const initialDate = dayjs();
  const finalDate = initialDate.add(6, "days");

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const renderTableHead = () => {
    const days: JSX.Element[] = [
      <th key={-1} className="rounded-md bg-secondary-500 p-4">
        <span className="select-none font-bold uppercase tracking-wide">
          Hora
        </span>
      </th>,
    ];

    for (let i = 0; i < 7; i++) {
      const currentDate = initialDate.add(i, "day");
      const dayIndex = currentDate.get("day") + 1;

      days[dayIndex] = (
        <th key={i} className="rounded-md bg-secondary-500 p-4">
          <span className="select-none font-bold uppercase tracking-wide">
            {currentDate.format("dddd")}
          </span>
          <br />
          <span className="select-none text-xs tracking-wide">
            {currentDate.format("DD/MM/YYYY")}
          </span>
        </th>
      );
    }

    return (
      <thead className="rounded-full text-gray-50">
        <tr>{days}</tr>
      </thead>
    );
  };

  return (
    <DashboardLayout>
      <Seo
        title="Horario | Academia Dahilmar Sáez"
        description="Horario | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-white md:py-14 md:px-8">
        <div className="flex">
          <h1 className="ml-2 font-display text-4xl font-semibold uppercase">
            <span className="mr-4 font-display text-6xl font-semibold uppercase">
              Semana
            </span>
            <span>
              {initialDate.format("DD/MM/YYYY")} -{" "}
              {finalDate.format("DD/MM/YYYY")}
            </span>
          </h1>
        </div>
        {isLoading ? (
          <div className="w-full bg-gray-50 pt-16">
            <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
          </div>
        ) : (
          <table className="mt-8 w-full border-separate border-spacing-2 bg-white text-sm">
            {renderTableHead()}
            <ScheduleTableBody groups={groups} />
          </table>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Schedule;
