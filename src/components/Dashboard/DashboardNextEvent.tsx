import { CalendarSVG, SpinnerSVG } from "@components/SVG";
import { get } from "@services/event";
import { useEventStore } from "@store/event";
import { useEffect, useState } from "react";
import dayjs from "@lib/dayjs";
import Link from "next/link";
import Button from "@components/Button";

const DashboardNextEvent = () => {
  const { events } = useEventStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const sortedEvents: CalendarEvent[] = events.sort(
    (a, b) => dayjs(a.datetime).unix() - dayjs(b.datetime).unix()
  );

  const nextEvent: CalendarEvent | undefined = sortedEvents.find((event) => {
    return dayjs(event.datetime).unix() >= dayjs().unix();
  });

  const prevEvent: CalendarEvent | undefined = sortedEvents
    .reverse()
    .find((event) => {
      return dayjs().unix() >= dayjs(event.datetime).unix();
    });

  const displayedEvent = nextEvent || prevEvent;

  return (
    <div className="flex flex-col gap-4 border p-6 md:h-72">
      <header className="flex items-center">
        <h1 className="font-display text-lg font-semibold uppercase md:text-2xl">
          {nextEvent
            ? "Próximo Evento"
            : prevEvent
            ? "Evento Anterior"
            : "Próximo Evento"}
        </h1>
        <Link
          href={"/dashboard/calendar"}
          className="ml-auto text-xs md:text-base"
        >
          <Button styles="px-2 md:px-8">Ver Eventos</Button>
        </Link>
      </header>
      <div className="flex gap-4 md:h-full">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
          </div>
        ) : (
          <>
            {displayedEvent ? (
              <>
                <div className="flex aspect-square w-1/3 shrink-0 flex-col items-center justify-center rounded-md bg-secondary-500 text-white md:w-auto md:p-4">
                  <CalendarSVG className="h-8 w-8 text-white" />
                </div>
                <div className="flex w-full flex-col items-start justify-center rounded-md border p-4">
                  <div className="text-sm font-semibold md:text-base">
                    {displayedEvent.name}
                  </div>
                  <div className="mt-1 text-xs line-clamp-2 md:mt-0 md:text-base">
                    {displayedEvent.description}
                  </div>
                  <div className="mt-1  text-xs capitalize text-gray-400 md:text-sm">
                    {dayjs(displayedEvent.datetime).format("dddd DD [de] MMMM")}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex w-full items-center justify-center rounded-md border px-2 py-5 text-center font-display text-lg font-semibold uppercase md:text-2xl">
                Eventos no encontrados
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardNextEvent;
