import { useState } from "react";

import { TrashFillSVG } from "../SVG";
import Confirm from "@components/Popover/Confirm";
import { useToastStore } from "@store/toast";
import { deleteGroup } from "@services/group";
import Button from "@components/Button";

const GroupDeleteButton: ({
  group,
  onConfirm,
}: {
  group: Group;
  onConfirm: () => void;
}) => JSX.Element = ({ group, onConfirm }) => {
  const { addToast } = useToastStore();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteGroup(group.id);

      addToast({
        title: "Grupo Eliminado",
      });
      setShowConfirm(false);
      onConfirm();
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
        <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
          <TrashFillSVG className="h-6 w-6 " />
        </button>
      }
      content={
        <div>
          <div className="mb-4 text-center text-lg font-semibold">
            Confirmación
          </div>
          <div className="text-center">¿Desea borrar el grupo?</div>
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

export default GroupDeleteButton;
