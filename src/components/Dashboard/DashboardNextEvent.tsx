import { CalendarSVG } from "@components/SVG";
import dayjs from "@lib/dayjs";
import React from "react";

const DashboardNextEvent = () => {
  return (
    <div className="flex h-full gap-4">
      <div className="flex aspect-square shrink-0 flex-col items-center justify-center rounded-md bg-secondary-500 p-4 text-white">
        <CalendarSVG className="h-8 w-8 text-white" />
      </div>
      <div className="flex w-full flex-col items-start justify-center rounded-md border p-4">
        <div className="font-semibold">Torneo</div>
        <div>Descripcion del torneo</div>
        <div className="mt-1 text-sm capitalize text-gray-400">
          {dayjs().add(1, "week").format("dddd DD [de] MMMM")}
        </div>
      </div>
    </div>
  );
};

export default DashboardNextEvent;
