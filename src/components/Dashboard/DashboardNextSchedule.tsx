import { SpinnerSVG, TennisBallSVG, TennisRaquetSVG } from "@components/SVG";
import { useGroupStore } from "@store/group";
import dayjs from "@lib/dayjs";
import { useEffect, useState } from "react";
import { get } from "@services/group";
import { USER_ROLES } from "@utils/global";
import Link from "next/link";
import Button from "@components/Button";

const DashboardNextSchedule = () => {
  const { groups } = useGroupStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

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
    .sort((a, b) => a.schedule.day - b.schedule.day);

  const endSchedule: DerivedSchedule | undefined = derivedSchedules.find(
    (derivedSchedule) => {
      return derivedSchedule.schedule.day >= dayjs().get("day");
    }
  );

  const startSchedule: DerivedSchedule | undefined = derivedSchedules.find(
    (derivedSchedule) => {
      return derivedSchedule.schedule.day >= dayjs().startOf("week").get("day");
    }
  );

  const nextSchedule = endSchedule || startSchedule;

  return (
    <div className="flex flex-col gap-4 border p-6 md:h-72">
      <header className="flex items-center">
        <h1 className="font-display text-lg font-semibold uppercase md:text-2xl">
          Próxima Clase
        </h1>
        <Link
          href={"/dashboard/schedule/athlete"}
          className="ml-auto text-xs md:text-base"
        >
          <Button>Ver Horarios</Button>
        </Link>
      </header>
      <div className="flex gap-4 md:h-full">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
          </div>
        ) : (
          <>
            {nextSchedule ? (
              <>
                <div className="flex aspect-square w-1/3 shrink-0 flex-col items-center justify-center rounded-md bg-secondary-500 text-white md:w-auto md:p-4">
                  <span className="select-none font-bold uppercase tracking-wide">
                    {dayjs()
                      .set("day", nextSchedule.schedule.day)
                      .format("dddd")}
                  </span>
                  <br />
                  <span className="select-none text-xs tracking-wide">
                    {dayjs()
                      .set("day", nextSchedule.schedule.day)
                      .format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className="flex w-full flex-col items-start justify-center rounded-md border p-4">
                  <div className="text-sm font-bold uppercase tracking-tight">
                    <div className="flex items-center gap-1">
                      <TennisBallSVG className="w-4 text-primary-500" />
                      <span className="line-clamp-2">
                        {nextSchedule.group.name}
                      </span>
                    </div>
                    {nextSchedule.trainers.slice(0, 3).map((trainer) => (
                      <div key={trainer.id} className="mt-2 flex gap-1">
                        <TennisRaquetSVG className="mt-1 w-4 text-secondary-500" />
                        <span className=" line-clamp-1">
                          {trainer.firstName} {trainer.lastName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex w-full items-center justify-center rounded-md border px-2 py-5 text-center font-display text-lg font-semibold uppercase md:text-2xl">
                Horarios no encontrados
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardNextSchedule;
