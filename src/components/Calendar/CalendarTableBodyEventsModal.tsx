import { CrossSVG } from "@components/SVG";

import { Modal } from "flowbite-react";

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
    <Modal
      show={showModal}
      onClose={onClose}
      dismissible={true}
      className="animate-fade animate-duration-200 animate-ease-out"
      position="center"
    >
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default CalendarTableBodyEventsModal;
