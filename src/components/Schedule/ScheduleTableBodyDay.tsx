import React, { useState } from "react";
import { TennisBallSVG, TennisRaquetSVG } from "@components/SVG";
import ScheduleTableBodyDayModal from "./ScheduleTableBodyDayModal";

const ScheduleTableBodyDay: ({
  derivedSchedule,
}: {
  derivedSchedule?: DerivedSchedule;
}) => JSX.Element = ({ derivedSchedule }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <td
        className={`cursor-pointer rounded-md border border-gray-300 p-2 align-top ${
          derivedSchedule ? " hover:bg-gray-100" : ""
        }`}
        onClick={derivedSchedule ? () => setShowModal(true) : undefined}
      >
        {derivedSchedule ? (
          <div className="text-xs font-bold uppercase tracking-tight md:text-sm">
            <div className="flex items-center gap-1">
              <TennisBallSVG className="w-4 shrink-0 text-primary-500" />
              <span className="line-clamp-2">{derivedSchedule.group.name}</span>
            </div>
            {derivedSchedule.trainers.map((trainer) => (
              <div key={trainer.id} className="mt-2 flex gap-1">
                <TennisRaquetSVG className="mt-1 w-4 shrink-0 text-secondary-500" />
                <span className="line-clamp-2">
                  {trainer.firstName} {trainer.lastName}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </td>
      {showModal && derivedSchedule ? (
        <ScheduleTableBodyDayModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          derivedSchedule={derivedSchedule}
        />
      ) : null}
    </>
  );
};

export default ScheduleTableBodyDay;
