import { TennisBallSVG, TennisRaquetSVG } from "@components/SVG";
import React from "react";

const DashboardNextSchedule = () => {
  return (
    <div className="flex h-full gap-4">
      <div className="flex aspect-square shrink-0 flex-col items-center justify-center rounded-md bg-secondary-500 p-4 text-white">
        <span className="select-none font-bold uppercase tracking-wide">
          Martes
        </span>
        <br />
        <span className="select-none text-xs tracking-wide">27/06/2023</span>
      </div>
      <div className="flex w-full flex-col items-start justify-center rounded-md border p-4">
        <div className="text-sm font-bold uppercase tracking-tight">
          <div className="flex items-center gap-1">
            <TennisBallSVG className="w-4 text-primary-500" />
            <span className="line-clamp-2">Grupo A</span>
          </div>
          <div className="mt-2 flex gap-1">
            <TennisRaquetSVG className="mt-1 w-4 text-secondary-500" />
            <span className=" line-clamp-2">Carlos Ferrer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNextSchedule;
