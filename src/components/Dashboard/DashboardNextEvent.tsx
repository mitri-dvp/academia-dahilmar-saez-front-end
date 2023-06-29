import { CalendarSVG, SpinnerSVG } from "@components/SVG";
import { get } from "@services/event";
import { useEventStore } from "@store/event";
import { useEffect, useState } from "react";
import dayjs from "@lib/dayjs";

const DashboardNextEvent = () => {
  const { events } = useEventStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const nextEvent: CalendarEvent | undefined = events
    .sort((a, b) => dayjs(a.datetime).unix() - dayjs(b.datetime).unix())
    .find((event) => {
      return dayjs(event.datetime).unix() >= dayjs().unix();
    });

  return (
    <div className="flex h-full gap-4">
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
        </div>
      ) : (
        <>
          {nextEvent ? (
            <>
              <div className="flex aspect-square shrink-0 flex-col items-center justify-center rounded-md bg-secondary-500 p-4 text-white">
                <CalendarSVG className="h-8 w-8 text-white" />
              </div>
              <div className="flex w-full flex-col items-start justify-center rounded-md border p-4">
                <div className="font-semibold">{nextEvent.name}</div>
                <div>{nextEvent.description}</div>
                <div className="mt-1 text-sm capitalize text-gray-400">
                  {dayjs(nextEvent.datetime).format("dddd DD [de] MMMM")}
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full items-center justify-center rounded-md border px-2 py-5 text-center font-display text-2xl font-semibold uppercase">
              Eventos no encontrados
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardNextEvent;
