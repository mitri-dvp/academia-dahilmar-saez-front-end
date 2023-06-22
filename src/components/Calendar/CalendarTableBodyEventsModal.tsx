import { useState } from "react";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import CalendarTableBodyEventsModalViewContent from "@components/Calendar/CalendarTableBodyEventsModalViewContent";
import CalendarTableBodyEventsModalEditContent from "@components/Calendar/CalendarTableBodyEventsModalEditContent";

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
