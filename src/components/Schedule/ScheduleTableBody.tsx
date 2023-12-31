import React from "react";
import { USER_ROLES } from "@utils/global";
import dayjs from "@lib/dayjs";
import ScheduleTableBodyDay from "./ScheduleTableBodyDay";

const ScheduleTableBody: ({ groups }: { groups: Group[] }) => JSX.Element = ({
  groups,
}) => {
  const renderTableBody = () => {
    const derivedSchedules: DerivedSchedule[] = groups
      .map((group) =>
        group.schedules.map((shcedule) => {
          return {
            group: {
              id: group.id,
              name: group.name,
              description: group.description,
            },
            trainers: group.users
              .filter((user) => user.role.type === USER_ROLES.TRAINER)
              .map((trainer) => ({
                id: trainer.id,
                firstName: trainer.firstName,
                lastName: trainer.lastName,
                photo: trainer.photo,
                email: trainer.email,
              })),
            schedule: {
              day: dayjs(shcedule.datetime).get("day"),
              hour: dayjs(shcedule.datetime).get("hour"),
            },
          };
        })
      )
      .flat()
      .sort((a, b) => a.schedule.hour - b.schedule.hour);

    const firstDerivedSchedule = derivedSchedules[0];
    const lastDerivedSchedule = derivedSchedules[derivedSchedules.length - 1];

    if (!firstDerivedSchedule || !lastDerivedSchedule) {
      // User has no schedules
      return (
        <tbody>
          <tr>
            <td
              className="rounded-md border border-gray-300 px-2 py-5 text-center font-display text-lg font-semibold uppercase md:text-2xl"
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

      const days: JSX.Element[] = [
        <td
          key={currentHour.format("h")}
          className="rounded-md border border-gray-300 px-2 py-5 text-center"
        >
          <span className="text-lg font-semibold md:text-2xl">
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

        days[dayIndex + 1] = (
          <ScheduleTableBodyDay
            key={`${hourIndex}-${dayIndex + 1}`}
            derivedSchedule={derivedSchedule}
          />
        );
      }

      weeks.push(<tr key={hourIndex}>{days}</tr>);
    }

    return <tbody>{weeks}</tbody>;
  };

  return <>{renderTableBody()}</>;
};

export default ScheduleTableBody;
