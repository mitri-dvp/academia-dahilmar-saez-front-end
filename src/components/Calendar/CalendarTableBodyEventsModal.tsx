import { CalendarSVG, CrossSVG } from "@components/SVG";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import dayjs from "@utils/dayjs";

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
              <CrossSVG className="h-6 w-6 stroke-dark-500" />
            </button>
          </div>
          {events.map((event) => (
            <div key={event.id} className="flex gap-4 rounded-md  p-4  ">
              <CalendarSVG className="" />
              <div>
                <div className="font-semibold">{event.name}</div>
                <div>{event.description}</div>
                <div className="mt-1 text-sm capitalize text-gray-400">
                  {dayjs(event.datetime).format("dddd DD [de] MMMM")}
                </div>
              </div>
            </div>
          ))}
        </Content>
      </Portal>
    </Root>
  );
};

export default CalendarTableBodyEventsModal;
