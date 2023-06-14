import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import React from "react";
import { CrossSVG } from "../SVG";

const ScheduleAddModal: ({
  showModal,
  onClose,
}: {
  showModal: boolean;
  onClose: () => void;
}) => JSX.Element = ({ showModal, onClose }) => {
  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          <div className="flex justify-end">
            <button onClick={onClose} type="button">
              <CrossSVG className="h-6 w-6 stroke-gray-900" />
            </button>
          </div>
          <div>
            <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
              Crear Grupo
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default ScheduleAddModal;
