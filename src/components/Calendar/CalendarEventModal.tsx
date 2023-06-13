import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import React from "react";

import {
  CalendarSVG,
  CheckCircleSVG,
  ChevronLeftSVG,
  ChevronRightSVG,
  ClockSVG,
  DatepickerSVG,
  SpinnerSVG,
  CrossSVG,
  PersonSVG,
} from "../SVG";
import { useGroupStore } from "@store/group";
import { getAthletes } from "@services/user";
import { USER_ROLES, removeFocus } from "@utils/global";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import { create } from "@services/event";
import { useUserStore } from "@store/user";
import { useChatStore } from "@store/chat";

import { useFormik } from "formik";
import { date, z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "@utils/dayjs";
import type { AxiosError } from "axios";
import axios from "axios";
import Button from "@components/Button";
import Link from "next/link";
import DayInput from "@components/DayInput";
import TimeInput from "@components/TimeInput";
import { get } from "@services/attendance";
import { getAttendances } from "@services/group";

const CalendarEventModal: ({
  showModal,
  onClose,
}: {
  showModal: boolean;
  onClose: () => void;
}) => JSX.Element = ({ showModal, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: {
        startDate: null,
        endDate: null,
      },
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({
          required_error: "Introduzca un nombre",
        }),
        description: z.string({
          required_error: "Introduzca una descripción",
        }),
        date: z.object({
          startDate: z
            .string({
              required_error: "Introduzca una fecha",
              invalid_type_error: "Introduzca una fecha válida",
            })
            .regex(
              /(\d{1,4}(\/|-)\d{1,2}(\/|-)\d{1,2})/gm,
              "Introduzca una fecha válida"
            ),
          endDate: z
            .string({
              required_error: "Introduzca una fecha",
              invalid_type_error: "Introduzca una fecha válida",
            })
            .regex(
              /(\d{1,4}(\/|-)\d{1,2}(\/|-)\d{1,2})/gm,
              "Introduzca una fecha válida"
            ),
        }),
      })
    ),
    onSubmit: async (values) => {
      try {
        // Action
        await create({
          name: values.name,
          description: values.description,
          datetime: dayjs(values.date.startDate).toDate(),
        });
        // On Success
        // handleSuccess();
        handleClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      show={showModal}
      onClose={handleClose}
      dismissible={true}
      className="animate-fade animate-duration-200 animate-ease-out"
      position="top-center"
    >
      <Modal.Body>
        <div className="flex justify-end">
          <button onClick={handleClose} type="button">
            <CrossSVG className="h-6 w-6 stroke-gray-900" />
          </button>
        </div>
        <div className="py-6">
          <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
            Crear Evento
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto w-96 space-y-8"
          >
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
                <div className="z-1 group relative" tabIndex={-1}>
                  <Datepicker
                    primaryColor={"orange"}
                    containerClassName="group"
                    toggleClassName="text-dark-500 pr-0"
                    inputClassName="text-base font-normal text-dark-500 group rounded-none outline-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 pl-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white dark:focus:border-sering-secondary-300"
                    inputId="date"
                    inputName="date"
                    value={formik.values.date}
                    onChange={(newDate: DateValueType) => {
                      formik.setFieldValue("date", newDate);
                    }}
                    asSingle={true}
                    useRange={false}
                    toggleIcon={() => <DatepickerSVG className="h-5 w-5" />}
                    displayFormat="DD/MM/YYYY"
                    placeholder=" "
                    i18n="es"
                    readOnly
                  />
                  <label
                    htmlFor="date"
                    className={`group-focus:dark:text-sering-secondary-300 absolute top-3 origin-[0] translate-y-0 transform text-base text-dark-500 duration-300 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:text-secondary-500 group-focus:left-0 group-focus:-translate-y-6 group-focus:scale-75 dark:text-dark-500 ${
                      formik.values.date &&
                      formik.values.date.startDate === null
                        ? "translate-y-0 scale-100"
                        : "-translate-y-6 scale-75"
                    }`}
                  >
                    Fecha
                  </label>
                  <p className="mt-2 text-xs text-red-500">
                    {formik.touched.date && Boolean(formik.errors.date)
                      ? formik.errors.date?.startDate
                      : "\xA0"}
                  </p>
                </div>
              </div>
            </div>

            <Button
              styles="mx-auto"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Añadir Evento
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CalendarEventModal;
