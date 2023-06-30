import { useState } from "react";

import { TrashFillSVG } from "../SVG";
import Confirm from "@components/Popover/Confirm";
import { useToastStore } from "@store/toast";
import Button from "@components/Button";
import { deleteEvent } from "@services/event";

const EventDeleteButton: ({
  event,
}: {
  event: CalendarEvent;
}) => JSX.Element = ({ event }) => {
  const { addToast } = useToastStore();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await deleteEvent(event.id);

      addToast({
        title: "Evento Eliminado",
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
        <button onClick={() => setShowConfirm(!showConfirm)} type="button">
          <TrashFillSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
        </button>
      }
      content={
        <div>
          <div className="mb-4 text-center text-lg font-semibold">
            Confirmación
          </div>
          <div className="text-center">¿Desea borrar el evento?</div>
          <div className="text-center">Esta acción es irreversible</div>
          <div className="mt-4 flex gap-4">
            <Button styles="w-1/2" onClick={handleDelete}>
              Si
            </Button>
            <Button
              styles="w-1/2"
              color="clear"
              onClick={() => setShowConfirm(false)}
            >
              No
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default EventDeleteButton;
