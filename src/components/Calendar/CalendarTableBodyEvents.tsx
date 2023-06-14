const CalendarTableBodyEvents: ({
  events,
}: {
  events: CalendarEvent[];
}) => JSX.Element = ({ events }) => {
  const eventList: JSX.Element[] = [];
  for (let k = 0; k < events.length; k++) {
    const event = events[k];
    if (!event || k === 3) break;
    eventList.push(
      <div
        key={event.id}
        className="mx-1 mt-0.5 rounded-md bg-secondary-500 px-1 text-xs font-bold text-white line-clamp-1"
      >
        {event.name}
      </div>
    );
  }

  return <div>{eventList}</div>;
};

export default CalendarTableBodyEvents;
