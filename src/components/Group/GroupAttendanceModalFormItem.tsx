import { useEffect, useState } from "react";
import React from "react";
import {
  CalendarSVG,
  CheckCircleSVG,
  ChevronLeftSVG,
  ChevronRightSVG,
  ClockSVG,
  CrossSVG,
  DatepickerSVG,
  PersonSVG,
  SpinnerSVG,
} from "../SVG";
import { useGroupStore } from "@store/group";
import { getAthletes } from "@services/user";
import { USER_ROLES } from "@utils/global";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import { create } from "@services/schedule";
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
import { useAttendanceStore } from "@store/attendance";

const GroupAttendanceFormItem: ({
  athlete,
  selectedDate,
  onChange,
}: {
  athlete: User;
  selectedDate: string;
  onChange: (draftAttendance: DraftAttendance) => void;
}) => JSX.Element = ({ athlete, selectedDate, onChange }) => {
  const { groupAttendances } = useAttendanceStore();

  const attendance = groupAttendances.find((attendance) => {
    const userMatch = attendance.user.id === athlete.id;
    const dateMatch =
      dayjs(attendance.datetime).format("YYYY-MM-DD") ===
      dayjs(selectedDate).format("YYYY-MM-DD");

    return userMatch && dateMatch;
  });

  useEffect(() => {
    // Not rerendering this?
    formik.setValues({
      id: attendance ? attendance.id : null,
      status: attendance ? attendance.status : false,
      remarks: attendance ? attendance.remarks : "",
      userID: athlete.id,
    });
  }, [attendance]);

  const formik = useFormik({
    initialValues: {
      id: attendance ? attendance.id : null,
      status: attendance ? attendance.status : false,
      remarks: attendance ? attendance.remarks : "",
      userID: athlete.id,
    },
    onSubmit: async (values) => {
      onChange(values);
    },
  });

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onInput={formik.handleSubmit}
      className="flex"
    >
      <div className="flex w-full select-none gap-4 bg-white p-2 hover:bg-gray-100">
        <div className="relative my-auto aspect-square h-8 w-8">
          {athlete.photo ? (
            <Image
              className="h-8 w-8 rounded-full object-cover"
              src={getImageURL(athlete.photo)}
              alt={athlete.photo.name}
              width={320}
              height={320}
            />
          ) : (
            <PersonSVG className="aspect-square h-8 w-8" />
          )}
        </div>
        <div className="flex items-center">
          <div className="text-base font-bold text-dark-500">
            {athlete.firstName} {athlete.lastName}
          </div>
        </div>
      </div>
      <div className="flex w-1/6 select-none items-center justify-center gap-4 bg-white p-2 hover:bg-gray-100">
        <input
          onChange={(e) => formik.setFieldValue("status", e.target.checked)}
          type="checkbox"
          checked={formik.values.status}
          value=""
          className="dark:focus:ring-setext-secondary-500 h-6 w-6 cursor-pointer rounded border-gray-300 bg-gray-100 text-secondary-500 focus:ring-2 focus:ring-secondary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
        />
      </div>
      <div className="flex w-full items-center  bg-white p-2 hover:bg-gray-100">
        <div className="relative z-0 w-full">
          <input
            type="text"
            id="remarks"
            className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0  text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
            placeholder=" "
            value={formik.values.remarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="remarks"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
          >
            Observaciones
          </label>
        </div>
      </div>
    </form>
  );
};

export default GroupAttendanceFormItem;
