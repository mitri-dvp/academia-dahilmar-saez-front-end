import { useState } from "react";
import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";

import React from "react";

import GroupModalViewContent from "./GroupModalViewContent";
import GroupModalEditContent from "./GroupModalEditContent";
import { useGroupStore } from "@store/group";

const GroupModal: ({
  showModal,
  onClose,
}: {
  showModal: boolean;
  onClose: () => void;
}) => JSX.Element = ({ showModal, onClose }) => {
  const { selectedGroup } = useGroupStore();

  const group = selectedGroup as Group;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          {isEditing ? (
            <GroupModalEditContent
              onClose={onClose}
              group={group}
              toggleEditing={toggleEditing}
            />
          ) : (
            <GroupModalViewContent
              onClose={onClose}
              group={group}
              toggleEditing={toggleEditing}
            />
          )}
        </Content>
      </Portal>
    </Root>
  );
};

export default GroupModal;
