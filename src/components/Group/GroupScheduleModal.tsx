import { useEffect, useState } from "react";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";

import React from "react";
import { ClockSVG, CrossSVG, DatepickerSVG } from "../SVG";
import { useGroupStore } from "@store/group";
import { getAthletes } from "@services/user";
import { removeFocus } from "@utils/global";
import { create } from "@services/schedule";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import dayjs from "@utils/dayjs";
import Button from "@components/Button";
import DayInput from "@components/DayInput";
import TimeInput from "@components/TimeInput";

const GroupScheduleModal: ({
  showModal,
  onClose,
  groupID,
}: {
  showModal: boolean;
  onClose: () => void;
  groupID: number;
}) => JSX.Element = ({ showModal, onClose, groupID }) => {
  const { groups } = useGroupStore();

  const group = groups.find((group) => group.id === groupID);

  const formik = useFormik({
    initialValues: {
      day: null,
      time: null,
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
      if (!group) return;
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
        // handleSuccess();
        // onClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  const [athletes, setAthletes] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [showDayInput, setShowDayInput] = useState(false);
  const [showTimeInput, setShowTimeInput] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAthletes()
      .then((athletes) => {
        setAthletes(athletes);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (!group) return <React.Fragment />;

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
          <div>
            <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
              Horarios {group.name}
            </div>

            <div className="mx-auto w-96 space-y-8">
              <div className="text-base font-semibold">Horarios</div>
              {group.schedules.length ? (
                group.schedules.map((schedule) => (
                  <React.Fragment key={schedule.id}>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <h1 className="text-sm font-bold text-dark-500">Día</h1>
                        <div className="mb-2 w-full capitalize text-dark-500">
                          {dayjs(schedule.datetime).format("dddd")}
                        </div>
                      </div>

                      <div className="w-1/2">
                        <h1 className="text-sm font-bold text-dark-500">
                          Hora
                        </h1>
                        <div className="mb-2 w-full text-dark-500">
                          {dayjs(schedule.datetime).format("hh:mm a")}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <h1 className="text-sm font-semibold text-dark-500">
                  Horarios no encontrados
                </h1>
              )}
              <form className="space-y-8" onSubmit={formik.handleSubmit}>
                <div className="text-base font-semibold">
                  Selecciona Día y Hora
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <div className="relative z-0">
                      <input
                        type="text"
                        id="day"
                        className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 capitalize text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                        placeholder=" "
                        value={
                          formik.values.day
                            ? dayjs(formik.values.day).format("dddd")
                            : ""
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
                              formik.setFieldValue("time", time);
                            }}
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
                <Button styles="mx-auto">Añadir Horario</Button>
              </form>
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default GroupScheduleModal;
