import { useState } from "react";

import { TrashFillSVG } from "../SVG";
import Confirm from "@components/Popover/Confirm";
import { useToastStore } from "@store/toast";
import { deleteGroup } from "@services/group";

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
      onClose={() => setShowConfirm(false)}
      onConfirm={handleDelete}
      isLoading={isLoading}
    >
      <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
        <TrashFillSVG className="h-6 w-6 " />
      </button>
    </Confirm>
  );
};

export default GroupDeleteButton;
