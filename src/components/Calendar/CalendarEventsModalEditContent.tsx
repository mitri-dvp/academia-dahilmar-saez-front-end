import React, { useState, useRef } from "react";
import Button from "@components/Button";
import {
  CalendarSVG,
  CrossSVG,
  DatepickerSVG,
  PencilSquareSVG,
  PlusCircleDottedSVG,
  TrashFillSVG,
} from "@components/SVG";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import { useUserStore } from "@store/user";
import dayjs from "@lib/dayjs";
import { USER_ROLES, removeFocus } from "@utils/global";
import { useToastStore } from "@store/toast";
import { useFormik } from "formik";
import { update } from "@services/event";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import DateInput from "@components/DateInput";

const CalendarEventsModalEditContent: ({
  event,
  toggleEditing,
  onClose,
}: {
  event: CalendarEvent;
  toggleEditing: (event: CalendarEvent | null) => void;
  onClose: () => void;
}) => JSX.Element = ({ toggleEditing, event, onClose }) => {
  const { addToast } = useToastStore();

  const [showCalendarInput, setShowCalendarInput] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      name: event.name,
      description: event.description,
      date: dayjs(event.datetime).toDate(),
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z
          .string({
            required_error: "Introduzca un nombre",
          })
          .min(0, "Introduzca un nombre")
          .max(50, "Longitud máxima superada"),
        description: z.string({
          required_error: "Introduzca una descripción",
        }),
        date: z.date({
          errorMap: () => ({ message: "Ingrese una fecha válida" }),
        }),
      })
    ),
    onSubmit: async (values) => {
      try {
        // Action
        await update(event.id, {
          name: values.name,
          description: values.description,
          datetime: dayjs(values.date).toDate(),
        });
        // On Success
        addToast({
          title: "Evento Actualizado",
        });
        handleClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    toggleEditing(null);
  };

  return (
    <React.Fragment>
      <div className="flex justify-end gap-4">
        <button onClick={() => toggleEditing(event)} type="button">
          <PencilSquareSVG className="h-6 w-6 stroke-dark-500" />
        </button>
        <button onClick={onClose} type="button">
          <CrossSVG className="h-6 w-6 stroke-dark-500" />
        </button>
      </div>
      <div>
        <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
          Editar Evento
        </div>
        <form onSubmit={formik.handleSubmit} className="mx-auto w-96 space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="w-full">
              <div className="relative z-0">
                <input
                  type="text"
                  id="name"
                  className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                  placeholder=" "
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                >
                  Nombre
                </label>
              </div>
              <p className="mt-2 text-xs text-red-500">
                {formik.touched.name && Boolean(formik.errors.name)
                  ? formik.errors.name
                  : "\xA0"}
              </p>
            </div>

            <div className="w-full">
              <div className="relative z-0">
                <textarea
                  id="description"
                  className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-4 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                  placeholder=" "
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={3}
                />
                <label
                  htmlFor="description"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                >
                  Descripción
                </label>
              </div>
              <p className="mt-2 text-xs text-red-500">
                {formik.touched.description &&
                Boolean(formik.errors.description)
                  ? formik.errors.description
                  : "\xA0"}
              </p>
            </div>

            <div className="w-full">
              <div className="relative">
                <div className="relative z-0">
                  <input
                    ref={dateRef}
                    id="date"
                    type="text"
                    className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 capitalize text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                    placeholder=" "
                    onChange={(e) => {
                      if (e.target.value === "") {
                        return formik.setFieldValue("date", undefined);
                      }
                      formik.setFieldValue(
                        "date",
                        dayjs(e.target.value, "DD/MM/YYYY").toDate()
                      );
                    }}
                    defaultValue={dayjs(formik.values.date).format(
                      "DD/MM/YYYY"
                    )}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      setShowCalendarInput(false);
                    }}
                    onFocus={() => {
                      setShowCalendarInput(true);
                    }}
                  />
                  <label
                    htmlFor="date"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                  >
                    Fecha
                  </label>
                  <label
                    htmlFor="date"
                    className="peer-focus:text-secondary-500"
                  >
                    <DatepickerSVG className="absolute bottom-2 right-0 h-5 w-5" />
                  </label>
                </div>

                <div onMouseDown={(e) => e.preventDefault()}>
                  {showCalendarInput ? (
                    <DateInput
                      selectedDate={dayjs(formik.values.date).toDate()}
                      onChange={(date: Date) => {
                        removeFocus();
                        formik.setFieldValue("date", date);
                        if (dateRef.current) {
                          dateRef.current.value =
                            dayjs(date).format("DD/MM/YYYY");
                        }
                      }}
                      onClear={() => {
                        formik.setFieldValue("date", undefined);
                        if (dateRef.current) {
                          dateRef.current.value = "";
                        }
                      }}
                    />
                  ) : null}
                </div>
              </div>
              <p className="mt-2 text-xs text-red-500">
                {formik.touched.date && Boolean(formik.errors.date)
                  ? String(formik.errors.date)
                  : "\xA0"}
              </p>
            </div>
          </div>

          <Button
            styles="mx-auto"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
          >
            Actualizar Evento
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CalendarEventsModalEditContent;
