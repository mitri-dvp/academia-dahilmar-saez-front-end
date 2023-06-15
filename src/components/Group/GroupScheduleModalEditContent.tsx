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
          <PencilSquareSVG className="h-6 w-6 stroke-dark-500" />
        </button>
        <button onClick={onClose} type="button">
          <CrossSVG className="h-6 w-6 stroke-dark-500" />
        </button>
      </div>
      <div>
        <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
          Editar Horarios {group.name}
        </div>

        <div className="mx-auto w-96 space-y-8">
          <div className="text-base font-semibold">Horarios</div>
          {group.schedules.length ? (
            group.schedules.map((schedule) => (
              <GroupScheduleModalEditContentItem
                key={schedule.id}
                schedule={schedule}
                group={group}
              />
            ))
          ) : (
            <h1 className="text-sm font-semibold text-dark-500">
              Horarios no encontrados
            </h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default GroupScheduleModalEditContent;