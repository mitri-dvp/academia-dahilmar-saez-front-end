import { useState } from "react";

import { TrashFillSVG } from "../SVG";
import Confirm from "@components/Popover/Confirm";
import { useToastStore } from "@store/toast";
import Button from "@components/Button";
import { deleteSchedule } from "@services/schedule";

const ScheduleDeleteButton: ({
  group,
  schedule,
}: {
  group: Group;
  schedule: Schedule;
}) => JSX.Element = ({ group, schedule }) => {
  const { addToast } = useToastStore();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await deleteSchedule(schedule.id, group.id);

      addToast({
        title: "Horario Eliminado",
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Confirm
      open={showConfirm}
      isLoading={isLoading}
      trigger={
        <button
          type="button"
          className="w-6 cursor-pointer text-red-600 transition-all hover:text-red-700"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          <TrashFillSVG className="h-full w-full" />
        </button>
      }
      content={
        <div>
          <div className="mb-4 text-center text-lg font-semibold">
            Confirmación
          </div>
          <div className="text-center">¿Desea borrar el horario?</div>
          <div className="text-center">Esta acción es irreversible</div>
          <div className="mt-4 flex gap-4">
            <Button
              styles="w-1/2"
              color="clear"
              onClick={() => setShowConfirm(false)}
            >
              No
            </Button>
            <Button styles="w-1/2" onClick={handleDelete}>
              Si
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default ScheduleDeleteButton;
