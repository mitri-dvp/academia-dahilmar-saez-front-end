import { SpinnerSVG } from "@components/SVG";
import { useGroupStore } from "@store/group";
import dayjs from "@lib/dayjs";
import { useEffect, useState } from "react";
import { get as getGroup } from "@services/group";
import { get as getAttendace } from "@services/attendance";
import { useAttendanceStore } from "@store/attendance";
import Link from "next/link";
import Button from "@components/Button";

const DashboardWeeklyAttendance = () => {
  const { groups } = useGroupStore();
  const { attendances } = useAttendanceStore();

  const calendarDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getGroup()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getAttendace()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  let totalCount = 0;
  let attendanceCount = 0;

  const weekAttendances = attendances.filter((attendance) =>
    dayjs(attendance.datetime).isBetween(
      dayjs().startOf("week"),
      dayjs().endOf("week")
    )
  );

  const schedules = Array.from(Array(7)).fill([]);

  groups.forEach((group) =>
    group.schedules.forEach((schedule) => {
      schedules[dayjs(schedule.datetime).get("day")] = [
        ...schedules[dayjs(schedule.datetime).get("day")],
        schedule,
      ];

      const match = weekAttendances.find((attendance) => {
        return (
          dayjs(attendance.datetime).get("day") ===
          dayjs(schedule.datetime).get("day")
        );
      });

      if (match) attendanceCount++;

      totalCount++;
    })
  );

  return (
    <div className="flex flex-col gap-4 border p-6 md:h-72">
      <header className="flex items-center">
        <h1 className="font-display text-lg font-semibold uppercase md:text-2xl">
          Asistencia Semanal
        </h1>
        <Link
          href={"/dashboard/attendance/athlete"}
          className="ml-auto text-xs md:text-base"
        >
          <Button styles="px-2 md:px-8">Ver Asistencias</Button>
        </Link>
      </header>
      <div className="flex h-full flex-col gap-4">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
          </div>
        ) : (
          <>
            {totalCount ? (
              <>
                <div className="flex justify-between font-semibold">
                  <div>
                    {dayjs().startOf("week").format("DD/MM/YYYY")} -{" "}
                    {dayjs().endOf("week").format("DD/MM/YYYY")}
                  </div>
                  <div>
                    {attendanceCount}/{totalCount}
                  </div>
                </div>
                <div className="grid h-full w-full grid-cols-7 grid-rows-1">
                  {calendarDays.map((day, index) => {
                    const match = weekAttendances.find((attendance) => {
                      return dayjs(attendance.datetime).get("day") === index;
                    });
                    return (
                      <div
                        key={day}
                        className="flex h-16 justify-center md:h-full"
                      >
                        <div
                          className={`mt-auto ${
                            match ? "h-full" : "h-0.5"
                          } w-8 rounded-t-full bg-secondary-500`}
                        />
                      </div>
                    );
                  })}
                  {calendarDays.map((day) => (
                    <div className="mt-auto pt-4 text-center" key={day}>
                      {day}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md border px-2 py-5 text-center font-display text-lg font-semibold uppercase md:text-2xl">
                Asistencias no encontradas
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardWeeklyAttendance;
