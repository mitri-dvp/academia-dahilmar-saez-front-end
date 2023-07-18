import React from "react";
import { CrossSVG, PencilSquareSVG } from "../SVG";

import GroupScheduleModalEditContentItem from "./GroupScheduleModalEditContentItem";

const GroupScheduleModalEditContent: ({
  group,
  onClose,
  toggleEditing,
}: {
  group: Group;
  onClose: () => void;
  toggleEditing: () => void;
}) => JSX.Element = ({ group, onClose, toggleEditing }) => {
  return (
    <React.Fragment>
      <div className="flex justify-end gap-4">
        <button onClick={toggleEditing} type="button">
          <PencilSquareSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
        </button>
        <button onClick={onClose} type="button">
          <CrossSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
        </button>
      </div>
      <div>
        <div className="mb-6 text-center font-display text-lg font-semibold uppercase md:text-2xl">
          Editar Horarios {group.name}
        </div>

        <div className="mx-auto space-y-8 md:w-96">
          <div className="text-sm font-semibold md:text-base">Horarios</div>
          {group.schedules.length ? (
            group.schedules.map((schedule) => (
              <GroupScheduleModalEditContentItem
                key={schedule.id}
                schedule={schedule}
                group={group}
              />
            ))
          ) : (
            <h1 className="text-xs font-semibold text-dark-500 md:text-sm">
              Horarios no encontrados
            </h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default GroupScheduleModalEditContent;
