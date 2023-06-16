import { useState } from "react";
import Button from "@components/Button";
import {
  CalendarSVG,
  CrossSVG,
  PencilSquareSVG,
  PlusCircleDottedSVG,
  TrashFillSVG,
} from "@components/SVG";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import { useUserStore } from "@store/user";
import dayjs from "@utils/dayjs";
import { USER_ROLES } from "@utils/global";
import CalendarTableBodyEventsModalViewContent from "./CalendarTableBodyEventsModalViewContent";
import CalendarTableBodyEventsModalEditContent from "./CalendarTableBodyEventsModalEditContent";

const CalendarTableBodyEventsModal: ({
  showModal,
  onClose,
  events,
}: {
  showModal: boolean;
  onClose: () => void;
  events: CalendarEvent[];
}) => JSX.Element = ({ showModal, onClose, events }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [event, setEvent] = useState<CalendarEvent | null>(null);

  const toggleEditing = (event: CalendarEvent | null) => {
    setEvent(event);
    setIsEditing(!isEditing);
  };

  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          {isEditing ? (
            <>
              {event ? (
                <CalendarTableBodyEventsModalEditContent
                  onClose={onClose}
                  event={event}
                  toggleEditing={toggleEditing}
                />
              ) : null}
            </>
          ) : (
            <CalendarTableBodyEventsModalViewContent
              onClose={onClose}
              events={events}
              toggleEditing={toggleEditing}
            />
          )}
        </Content>
      </Portal>
    </Root>
  );
};

export default CalendarTableBodyEventsModal;
