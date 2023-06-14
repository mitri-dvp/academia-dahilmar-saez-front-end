import { CrossSVG } from "@components/SVG";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";

const CalendarTableBodyEventsModal: ({
  showModal,
  onClose,
  events,
}: {
  showModal: boolean;
  onClose: () => void;
  events: CalendarEvent[];
}) => JSX.Element = ({ showModal, onClose, events }) => {
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
          {events.map((event, index) => {
            if (index === 3) return null;
            return (
              <div
                key={event.id}
                className="mx-1 mt-0.5 rounded-md bg-secondary-500 px-1 text-xs font-bold text-white line-clamp-1"
              >
                {event.name}
              </div>
            );
          })}
        </Content>
      </Portal>
    </Root>
  );
};

export default CalendarTableBodyEventsModal;
