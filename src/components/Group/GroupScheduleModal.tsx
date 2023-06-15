import { useState } from "react";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";

import React from "react";
import { useGroupStore } from "@store/group";

import GroupScheduleModalEditContent from "./GroupScheduleModalEditContent";
import GroupScheduleModalViewContent from "./GroupScheduleModalViewContent";

const GroupScheduleModal: ({
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
            <GroupScheduleModalEditContent
              onClose={onClose}
              group={group}
              toggleEditing={toggleEditing}
            />
          ) : (
            <GroupScheduleModalViewContent
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

export default GroupScheduleModal;
