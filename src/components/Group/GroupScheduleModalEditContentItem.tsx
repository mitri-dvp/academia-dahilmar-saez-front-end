import { useState } from "react";

import React from "react";
import { CheckCircleFillSVG, ClockSVG, DatepickerSVG } from "../SVG";
import { removeFocus } from "@utils/global";
import { update } from "@services/schedule";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import dayjs from "@lib/dayjs";
import DayInput from "@components/DayInput";
import TimeInput from "@components/TimeInput";
import { useToastStore } from "@store/toast";
import ScheduleDeleteButton from "@components/Button/ScheduleDeleteButton";

const GroupScheduleModalEditContentItem: ({
  schedule,
  group,
}: {
  schedule: Schedule;
  group: Group;
}) => JSX.Element = ({ schedule, group }) => {
  const { addToast } = useToastStore();

  const [showDayInput, setShowDayInput] = useState(false);
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      day: dayjs(schedule.datetime).toDate(),
      time: dayjs(schedule.datetime).toDate(),
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        day: z.date({
          required_error: "Introduzca el dia",
          invalid_type_error: "Introduzca el dia",
        }),
        time: z.date({
          required_error: "Introduzca la hora",
          invalid_type_error: "Introduzca la hora",
        }),
      })
    ),
    onSubmit: async (values) => {
      if (isLoading) return;
      setIsLoading(true);
      let datetime = dayjs();

      const dayDate = dayjs(values.day);
      const timeDate = dayjs(values.time);

      datetime = datetime.set("day", dayDate.get("day"));

      datetime = datetime.set("hour", timeDate.get("hour"));
      datetime = datetime.set("minutes", timeDate.get("minutes"));

      try {
        // Action
        await update(schedule.id, {
          datetime: datetime.toDate(),
          groupID: group.id,
        });
        // On Success
        // formik.resetForm();
        addToast({
          title: "Horario Actualizado",
        });
        // onClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
      setIsLoading(false);
    },
  });

  return (
    <form className="space-y-8" onSubmit={formik.handleSubmit}>
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <input
              type="text"
              id="day"
              className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 capitalize text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
              placeholder=" "
              value={
                formik.values.day ? dayjs(formik.values.day).format("dddd") : ""
              }
              onFocus={() => {
                setShowDayInput(true);
              }}
              onBlur={(e) => {
                formik.handleBlur(e);
                setShowDayInput(false);
              }}
              readOnly
            />
            <label
              htmlFor="day"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
            >
              Día
            </label>
            <label htmlFor="day" className="peer-focus:text-secondary-500">
              <DatepickerSVG className="absolute bottom-2 right-0 h-5 w-5" />
            </label>
            <div onMouseDown={(e) => e.preventDefault()}>
              {showDayInput ? (
                <DayInput
                  onChange={(day) => {
                    removeFocus();
                    formik.setFieldValue("day", day);
                  }}
                />
              ) : null}
            </div>
          </div>
          <p className="mt-2 text-xs text-red-500">
            {formik.touched.day && Boolean(formik.errors.day)
              ? String(formik.errors.day)
              : "\xA0"}
          </p>
        </div>

        <div className="w-1/2">
          <div className="relative">
            <input
              type="text"
              id="time"
              className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
              placeholder=" "
              value={
                formik.values.time
                  ? dayjs(formik.values.time).format("hh:mm a")
                  : ""
              }
              onFocus={() => {
                setShowTimeInput(true);
              }}
              onBlur={(e) => {
                formik.handleBlur(e);
                setShowTimeInput(false);
              }}
              readOnly
            />
            <label
              htmlFor="time"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
            >
              Hora
            </label>
            <label htmlFor="time" className="peer-focus:text-secondary-500">
              <ClockSVG className="absolute bottom-2 right-0 h-5 w-5" />
            </label>

            <div onMouseDown={(e) => e.preventDefault()}>
              {showTimeInput ? (
                <TimeInput
                  onChange={(time) => {
                    removeFocus();
                    formik.setFieldValue("time", time);
                  }}
                />
              ) : null}
            </div>
          </div>
          <p className="mt-2 text-xs text-red-500">
            {formik.touched.time && Boolean(formik.errors.time)
              ? String(formik.errors.time)
              : "\xA0"}
          </p>
        </div>

        <div className="flex w-max items-center gap-2 pb-4">
          <button
            type="button"
            disabled={formik.isSubmitting}
            className="w-6 cursor-pointer text-blue-600 transition-all hover:text-blue-700"
            onClick={() => formik.handleSubmit()}
          >
            <CheckCircleFillSVG className="h-full w-full" />
          </button>
          <ScheduleDeleteButton schedule={schedule} group={group} />
        </div>
      </div>
    </form>
  );
};

export default GroupScheduleModalEditContentItem;
