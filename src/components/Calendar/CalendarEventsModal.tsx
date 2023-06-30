import { useState } from "react";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import CalendarEventsModalViewContent from "@components/Calendar/CalendarEventsModalViewContent";
import CalendarEventsModalEditContent from "@components/Calendar/CalendarEventsModalEditContent";
import type { Dayjs } from "dayjs";
import CalendarEventsModalAddContent from "./CalendarEventsModalAddContent";

const CalendarEventsModal: ({
  showModal,
  events,
  currentDate,
  onClose,
}: {
  showModal: boolean;
  events: CalendarEvent[];
  currentDate: Dayjs;
  onClose: () => void;
}) => JSX.Element = ({ showModal, events, currentDate, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [event, setEvent] = useState<CalendarEvent | null>(null);

  const toggleAdding = () => {
    setEvent(null);
    setIsAdding(!isAdding);
    setIsEditing(false);
  };

  const toggleEditing = (event: CalendarEvent | null) => {
    setEvent(event);
    setIsEditing(!isEditing);
    setIsAdding(false);
  };

  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          {isEditing ? (
            <>
              {event ? (
                <CalendarEventsModalEditContent
                  event={event}
                  currentDate={currentDate}
                  onClose={onClose}
                  toggleEditing={toggleEditing}
                />
              ) : null}
            </>
          ) : isAdding ? (
            <CalendarEventsModalAddContent
              currentDate={currentDate}
              onClose={onClose}
              toggleAdding={toggleAdding}
            />
          ) : (
            <CalendarEventsModalViewContent
              events={events}
              currentDate={currentDate}
              onClose={onClose}
              toggleEditing={toggleEditing}
              toggleAdding={toggleAdding}
            />
          )}
        </Content>
      </Portal>
    </Root>
  );
};

export default CalendarEventsModal;
