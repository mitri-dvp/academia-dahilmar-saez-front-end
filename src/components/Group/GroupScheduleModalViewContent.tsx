import { useRef, useState } from "react";

import React from "react";
import { ClockSVG, CrossSVG, DatepickerSVG, PencilSquareSVG } from "../SVG";
import { removeFocus } from "@utils/global";
import { create } from "@services/schedule";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import dayjs from "@lib/dayjs";
import Button from "@components/Button";
import DayInput from "@components/Input/DayInput";
import TimeInput from "@components/Input/TimeInput";
import { useToastStore } from "@store/toast";

const GroupScheduleModalViewContent: ({
  group,
  onClose,
  toggleEditing,
}: {
  group: Group;
  onClose: () => void;
  toggleEditing: () => void;
}) => JSX.Element = ({ group, onClose, toggleEditing }) => {
  const { addToast } = useToastStore();

  const calendarDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const dayRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      day: undefined,
      time: undefined,
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        day: z.date({
          errorMap: () => ({ message: "Ingrese el día" }),
        }),
        time: z.date({
          errorMap: () => ({ message: "Ingrese la hora" }),
        }),
      })
    ),
    onSubmit: async (values) => {
      let datetime = dayjs();

      const dayDate = dayjs(values.day);
      const timeDate = dayjs(values.time);

      datetime = datetime.set("day", dayDate.get("day"));

      datetime = datetime.set("hour", timeDate.get("hour"));
      datetime = datetime.set("minutes", timeDate.get("minutes"));

      try {
        // Action
        await create({
          datetime: datetime.toDate(),
          groupID: group.id,
        });
        // On Success
        formik.resetForm();
        if (dayRef.current) dayRef.current.value = "";
        if (timeRef.current) timeRef.current.value = "";
        addToast({
          title: "Horario Agregado",
        });
        // onClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  const [showDayInput, setShowDayInput] = useState(false);
  const [showTimeInput, setShowTimeInput] = useState(false);

  return (
    <React.Fragment>
      <div className="flex justify-end gap-4">
        <button onClick={toggleEditing} type="button">
          <PencilSquareSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
        </button>
        <button onClick={onClose} type="button">
          <CrossSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
        </button>
      </div>
      <div>
        <div className="mb-6 text-center font-display text-lg font-semibold uppercase md:text-2xl">
          Horarios {group.name}
        </div>

        <div className="mx-auto space-y-8 md:w-96">
          <div className="text-sm font-semibold md:text-base">Horarios</div>
          {group.schedules.length ? (
            group.schedules.map((schedule) => (
              <React.Fragment key={schedule.id}>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <h1 className="text-sm font-bold text-dark-500">Día</h1>
                    <div className="mb-2 w-full text-sm capitalize text-dark-500 md:text-base">
                      {dayjs(schedule.datetime).format("dddd")}
                    </div>
                  </div>

                  <div className="w-1/2">
                    <h1 className="text-sm font-bold text-dark-500">Hora</h1>
                    <div className="mb-2 w-full text-sm text-dark-500 md:text-base">
                      {dayjs(schedule.datetime).format("hh:mm a")}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            <h1 className="text-xs font-semibold text-dark-500 md:text-sm">
              Horarios no encontrados
            </h1>
          )}
          <form className="space-y-8" onSubmit={formik.handleSubmit}>
            <div className="text-sm font-semibold md:text-base">
              Selecciona Día y Hora
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="relative z-0">
                  <input
                    ref={dayRef}
                    type="text"
                    id="day"
                    className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 capitalize text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                    placeholder=" "
                    onFocus={() => {
                      setShowDayInput(true);
                    }}
                    onBlur={(e) => {
                      formik.handleBlur(e);

                      let dayMatch = false;
                      if (e.target.value) {
                        for (let i = 0; i < calendarDays.length; i++) {
                          const day = calendarDays[i] as string;

                          if (
                            day
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                          ) {
                            dayMatch = true;
                            if (dayRef.current) {
                              dayRef.current.value = dayjs()
                                .set("day", i)
                                .format("dddd");
                            }
                            formik.setFieldValue(
                              "day",
                              dayjs().set("day", i).toDate()
                            );
                          }
                        }
                      }

                      if (!dayMatch) formik.setFieldValue("day", undefined);

                      setShowDayInput(false);
                    }}
                  />
                  <label
                    htmlFor="day"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500 md:text-base"
                  >
                    Día
                  </label>
                  <label
                    htmlFor="day"
                    className="peer-focus:text-secondary-500"
                  >
                    <DatepickerSVG className="absolute bottom-2 right-0 h-5 w-5" />
                  </label>
                  <div onMouseDown={(e) => e.preventDefault()}>
                    {showDayInput ? (
                      <DayInput
                        onChange={(day) => {
                          removeFocus();
                          if (dayRef.current) {
                            dayRef.current.value = dayjs(day).format("dddd");
                          }
                          formik.setFieldValue("day", day);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
                <p className="mt-2 text-xs text-red-500">
                  {formik.touched.day && Boolean(formik.errors.day)
                    ? formik.errors.day
                    : "\xA0"}
                </p>
              </div>

              <div className="w-1/2">
                <div className="relative z-0">
                  <input
                    ref={timeRef}
                    type="text"
                    id="time"
                    className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                    placeholder=" "
                    onFocus={() => setShowTimeInput(true)}
                    onBlur={(e) => {
                      formik.handleBlur(e);

                      const regexp = /([01]?[0-9]):([0-5][0-9]) ?(am|pm)/gi;
                      const matches = e.target.value.matchAll(regexp);

                      let timeMatch = false;
                      for (const match of matches) {
                        const hour = Number(match[1]);
                        const minutes = Number(match[2]);
                        const a = String(match[3]).toLowerCase();
                        const meridiem = a === "am" ? 0 : a === "pm" ? 1 : "";

                        if (hour > 12) break;

                        let timeInputDate = dayjs();

                        timeInputDate = timeInputDate.set(
                          "hour",
                          hour +
                            (meridiem
                              ? hour === 12
                                ? 0
                                : 12
                              : hour === 12
                              ? 12
                              : 0)
                        );
                        timeInputDate = timeInputDate.set("minutes", minutes);

                        if (timeRef.current) {
                          timeRef.current.value = dayjs(
                            timeInputDate.toDate()
                          ).format("hh:mm a");
                        }

                        formik.setFieldValue("time", timeInputDate.toDate());
                        timeMatch = true;
                      }

                      if (!timeMatch) formik.setFieldValue("time", undefined);

                      setShowTimeInput(false);
                    }}
                  />
                  <label
                    htmlFor="time"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500 md:text-base"
                  >
                    Hora
                  </label>
                  <label
                    htmlFor="time"
                    className="peer-focus:text-secondary-500"
                  >
                    <ClockSVG className="absolute bottom-2 right-0 h-5 w-5" />
                  </label>

                  <div onMouseDown={(e) => e.preventDefault()}>
                    {showTimeInput ? (
                      <TimeInput
                        onChange={(time) => {
                          removeFocus();
                          if (timeRef.current) {
                            timeRef.current.value =
                              dayjs(time).format("hh:mm a");
                          }
                          formik.setFieldValue("time", time);
                        }}
                        selectedTime={formik.values.time}
                      />
                    ) : null}
                  </div>
                </div>
                <p className="mt-2 text-xs text-red-500">
                  {formik.touched.time && Boolean(formik.errors.time)
                    ? formik.errors.time
                    : "\xA0"}
                </p>
              </div>
            </div>
            <Button styles="w-full md:w-1/2 mx-auto">Agregar Horario</Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GroupScheduleModalViewContent;
