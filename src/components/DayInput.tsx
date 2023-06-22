import dayjs from "@lib/dayjs";

const DayInput: ({
  onChange,
}: {
  onChange: (day: Date) => void;
}) => JSX.Element = ({ onChange }) => {
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return (
    <div className="absolute bottom-0 z-10 translate-y-full">
      <div className="absolute  mt-0.5 ml-[1.2rem] h-4 w-4 rotate-45 border-l border-t border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800" />
      <div className="mt-2.5 flex gap-2 border border-gray-300 bg-white p-2.5">
        {days.map((day, index) => (
          <div
            key={day}
            className="cursor-pointer rounded-md bg-secondary-500 p-2 transition-all hover:bg-secondary-700"
            onMouseDown={() => {
              onChange(dayjs().set("day", index).toDate());
            }}
          >
            <span className="select-none text-xs font-bold uppercase tracking-wide text-white ">
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayInput;
