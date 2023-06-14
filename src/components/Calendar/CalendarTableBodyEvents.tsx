const CalendarTableBodyEvents: ({
  events,
}: {
  events: CalendarEvent[];
}) => JSX.Element = ({ events }) => {
  return (
    <>
      {events.slice(0, 3).map((event) => (
        <div
          key={event.id}
          className="mx-1 mt-0.5 rounded-md bg-secondary-500 px-1 text-xs font-bold text-white line-clamp-1"
        >
          {event.name}
        </div>
      ))}
    </>
  );
};

export default CalendarTableBodyEvents;
