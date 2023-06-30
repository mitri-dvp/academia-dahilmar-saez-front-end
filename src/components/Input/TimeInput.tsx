import { useState } from "react";

import dayjs from "@lib/dayjs";
import { CaretDownSVG, CaretUpSVG } from "@components/SVG";

const TimeInput: ({
  onChange,
  selectedTime,
}: {
  onChange: (day: Date) => void;
  selectedTime?: Date;
}) => JSX.Element = ({ onChange, selectedTime }) => {
  const hh = dayjs(selectedTime).get("hour");
  const mm = dayjs(selectedTime).get("minutes");

  const [hour, setHour] = useState(hh > 12 ? hh - 12 : hh);
  const [minutes, setMinutes] = useState(mm);
  const [meridiem, setMeridiem] = useState(hh > 12 ? 1 : 0);

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
    if (minutes + 1 < 60) {
      setMinutes(minutes + 1);
    }
  };
  const handleMinutesDecrement = () => {
    if (minutes - 1 > 0) {
      setMinutes(minutes - 1);
    }
  };

  const handleChange = () => {
    let currentDate = dayjs();

    currentDate = currentDate.set(
      "hour",
      hour + (meridiem ? (hour === 12 ? 0 : 12) : hour === 12 ? 12 : 0)
    );
    currentDate = currentDate.set("minutes", minutes);

    onChange(currentDate.toDate());
  };

  return (
    <div className="absolute bottom-0 z-10 translate-y-full">
      <div className="mt-2.5 animate-fade-down border border-gray-300 bg-white p-2.5 animate-duration-200">
        <div className="absolute -mt-[19px] ml-[1.2rem] h-4 w-4 rotate-45 border-l border-t border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800" />
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
              className={`cursor-pointer px-1 transition-all hover:bg-gray-100 ${
                meridiem === 0 ? "text-secondary-500" : ""
              }`}
              onClick={() => setMeridiem(0)}
            >
              AM
            </span>
            <span
              className={`cursor-pointer px-1 transition-all hover:bg-gray-100 ${
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
          className="ml-auto mt-4 block w-max cursor-pointer rounded-md border-2 border-secondary-500 bg-secondary-500 px-2 py-0 font-semibold uppercase tracking-wider text-white transition-all hover:bg-secondary-700"
        >
          OK
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
