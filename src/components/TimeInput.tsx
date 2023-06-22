import { useState } from "react";

import dayjs from "@lib/dayjs";
import { CaretDownSVG, CaretUpSVG } from "@components/SVG";

const TimeInput: ({
  onChange,
}: {
  onChange: (day: Date) => void;
}) => JSX.Element = ({ onChange }) => {
  const [hour, setHour] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [meridiem, setMeridiem] = useState(0);

  const handleHourIncrement = () => {
    if (hour < 12) {
      setHour(hour + 1);
    }
  };
  const handleHourDecrement = () => {
    if (hour > 1) {
      setHour(hour - 1);
    }
  };
  const handleMinutesIncrement = () => {
    if (minutes < 55) {
      setMinutes(minutes + 5);
    }
  };
  const handleMinutesDecrement = () => {
    if (minutes > 0) {
      setMinutes(minutes - 5);
    }
  };

  const handleChange = () => {
    let currentDate = dayjs();

    currentDate = currentDate.set("hour", hour + (meridiem ? 12 : 0));
    currentDate = currentDate.set("minutes", minutes);

    onChange(currentDate.toDate());
  };

  return (
    <div className="absolute bottom-0 z-10 translate-y-full">
      <div className="absolute  mt-0.5 ml-[1.2rem] h-4 w-4 rotate-45 border-l border-t border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800" />
      <div className="mt-2.5 border border-gray-300 bg-white p-2.5">
        <div className="flex gap-2">
          <div className="grid grid-cols-2">
            <div
              onClick={handleHourIncrement}
              className="flex w-10 items-center justify-center"
            >
              <CaretUpSVG className="cursor-pointer text-secondary-500" />
            </div>
            <div
              onClick={handleMinutesIncrement}
              className="flex w-10 items-center justify-center"
            >
              <CaretUpSVG className="cursor-pointer text-secondary-500" />
            </div>
            <div className="flex w-10 items-center justify-center">
              <span>{String(hour).padStart(2, "0")}</span>
            </div>
            <div className="flex w-10 flex-col items-center justify-center">
              <span>{String(minutes).padStart(2, "0")}</span>
            </div>
            <div
              onClick={handleHourDecrement}
              className="flex w-10 items-center justify-center"
            >
              <CaretDownSVG className="cursor-pointer text-secondary-500" />
            </div>
            <div
              onClick={handleMinutesDecrement}
              className="flex w-10 items-center justify-center"
            >
              <CaretDownSVG className="cursor-pointer text-secondary-500" />
            </div>
          </div>
          <div className="flex w-10 flex-col items-center justify-center">
            <span
              className={`cursor-pointer ${
                meridiem === 0 ? "text-secondary-500" : ""
              }`}
              onClick={() => setMeridiem(0)}
            >
              AM
            </span>
            <span
              className={`cursor-pointer ${
                meridiem === 1 ? "text-secondary-500" : ""
              }`}
              onClick={() => setMeridiem(1)}
            >
              PM
            </span>
          </div>
        </div>
        <div
          onClick={handleChange}
          className="ml-auto mt-4 block w-max cursor-pointer border-2 border-secondary-500 bg-secondary-500 px-2 py-0 font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-700"
        >
          OK
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
