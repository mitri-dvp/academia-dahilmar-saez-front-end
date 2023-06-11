import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import dayjs from "@utils/dayjs";

import { SpinnerSVG, TennisBallSVG, TennisRaquetSVG } from "@components/SVG";

import { useGroupStore } from "@store/group";
import { get } from "@services/group";
import { USER_ROLES } from "@utils/global";

type DerivedSchedule = {
  schedule: {
    day: number;
    hour: number;
  };
  group: {
    name: string;
  };
  trainer: {
    fullName: string;
  };
};

const Schedule: NextPage = () => {
  const { groups } = useGroupStore();

  const [isLoading, setIsLoading] = useState(true);
  const initialDate = dayjs();

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const renderTableTitle = () => {
    const finalDate = initialDate.add(6, "days");

    return (
      <h1 className="ml-2 font-display text-4xl font-semibold uppercase">
        <span className="mr-4 font-display text-6xl font-semibold uppercase">
          Semana
        </span>
        <span>
          {initialDate.format("DD/MM/YYYY")} - {finalDate.format("DD/MM/YYYY")}
        </span>
      </h1>
    );
  };

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
      <thead className="rounded-full text-white">
        <tr>{days}</tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    const derivedSchedules: DerivedSchedule[] = [];

    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      if (!group) break;

      const trainer = group.users.filter(
        (user) => user.role.type === USER_ROLES.TRAINER
      );

      const derivedSchedule = {
        group: {
          name: group.name,
        },
        trainer: {
          fullName: trainer[0]
            ? `${trainer[0].firstName} ${trainer[0].lastName}`
            : "",
        },
      };

      for (let j = 0; j < group.schedules.length; j++) {
        const schedule = group.schedules[j];
        if (!schedule) break;

        const datetime = dayjs(schedule.datetime);

        derivedSchedules.push({
          ...derivedSchedule,
          schedule: {
            day: datetime.get("day"),
            hour: datetime.get("hour"),
          },
        });
      }
    }
    derivedSchedules.sort((a, b) => a.schedule.hour - b.schedule.hour);

    const firstDerivedSchedule = derivedSchedules[0];
    const lastDerivedSchedule = derivedSchedules[derivedSchedules.length - 1];

    if (!firstDerivedSchedule || !lastDerivedSchedule) {
      // User has no schedules
      return (
        <tbody>
          <tr>
            <td
              className="rounded-md border border-gray-300 px-2 py-5 text-center font-display text-2xl font-semibold uppercase"
              colSpan={8}
            >
              Horarios no encontrados
            </td>
          </tr>
        </tbody>
      );
    }

    const hourRows =
      lastDerivedSchedule.schedule.hour - firstDerivedSchedule.schedule.hour;

    const weeks: JSX.Element[] = [];
    for (let i = 0; i < hourRows + 1; i++) {
      const hourIndex = firstDerivedSchedule.schedule.hour + i;
      const currentHour = dayjs().set("hour", hourIndex);

      const week: JSX.Element[] = [
        <td
          key={currentHour.format("h")}
          className="rounded-md border border-gray-300 px-2 py-5 text-center"
        >
          <span className="text-2xl font-semibold">
            {currentHour.format("h")}
          </span>
          <span>{currentHour.format("a")}</span>
        </td>,
      ];

      for (let j = 0; j < 7; j++) {
        const currentDate = dayjs().set("day", j);
        const dayIndex = currentDate.get("day");

        const derivedSchedule = derivedSchedules.find((item) => {
          const hourMatch = item.schedule.hour === hourIndex;
          const dayMatch = item.schedule.day === dayIndex;
          return hourMatch && dayMatch;
        });

        week[dayIndex + 1] = (
          <td
            key={i}
            className={`rounded-md border border-gray-300 p-2 align-top ${
              derivedSchedule ? "" : ""
            }`}
          >
            {derivedSchedule ? (
              <div className="max-w-[130px] text-sm font-bold uppercase tracking-tight">
                <div className="flex items-center gap-1">
                  <TennisBallSVG className="w-4 text-primary-700" />
                  <span className="line-clamp-2">
                    {derivedSchedule.group.name}
                  </span>
                </div>
                <div className="mt-2 flex gap-1">
                  <TennisRaquetSVG className="mt-1 w-4 text-secondary-500" />
                  <span className=" line-clamp-2">
                    {derivedSchedule.trainer.fullName}
                  </span>
                </div>
              </div>
            ) : null}
          </td>
        );
      }

      weeks.push(<tr key={hourIndex}>{week}</tr>);
    }

    return <tbody>{weeks}</tbody>;
  };

  return (
    <DashboardLayout>
      <Seo
        title="Horario | Academia Dahilmar Sáez"
        description="Horario | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="w-max bg-white p-16 shadow-lg">
          <div className="flex">{renderTableTitle()}</div>
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <table className="mt-8 w-full border-separate border-spacing-2 bg-white text-sm">
              {renderTableHead()}
              {renderTableBody()}
            </table>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Schedule;
