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
import { postAttendances } from "@services/group";
import GroupAttendanceFormItem from "./GroupAttendanceModalFormItem";

const GroupAttendanceModalForm: ({
  group,
  attendances,
  selectedDate,
}: {
  group: Group;
  attendances: Attendance[];
  selectedDate: string;
  onSubmit: (attendances: Attendance[]) => void;
}) => JSX.Element = ({ group, attendances, selectedDate, onSubmit }) => {
  const userStore = useUserStore();
  const draftAttendances: DraftAttendance[] = [];

  const formik = useFormik({
    initialValues: {
      draftAttendances: draftAttendances,
    },
    onSubmit: async (values) => {
      if (values.draftAttendances.length === 0) return;
      try {
        // Action
        const attendances = await postAttendances(
          group.id,
          selectedDate,
          values.draftAttendances
        );
        // On Success
        onSubmit(attendances);
        formik.resetForm();
        // handleSuccess();
        // onClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  const handleChange = (draftAttendance: DraftAttendance) => {
    const index = formik.values.draftAttendances.findIndex(
      (attendance) => attendance.userID === draftAttendance.userID
    );

    if (index === -1) {
      // Add
      formik.setFieldValue("draftAttendances", [
        ...formik.values.draftAttendances,
        draftAttendance,
      ]);
    }

    if (index !== -1) {
      // Update
      const _draftAttendances = [...formik.values.draftAttendances];
      _draftAttendances[index] = draftAttendance;
      formik.setFieldValue("draftAttendances", _draftAttendances);
    }
  };

  return (
    <div className="flex min-h-[24rem] flex-col justify-between space-y-8">
      <div className="max-h-96 overflow-y-auto">
        {group.users.map((user) => {
          if (user.id === userStore.user.id) return null;
          return (
            <GroupAttendanceFormItem
              key={user.id}
              user={user}
              attendances={attendances}
              selectedDate={selectedDate}
              onChange={handleChange}
            />
          );
        })}
      </div>

      <form onClick={formik.handleSubmit} className="mx-auto w-1/2">
        <Button
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
          styles="w-full"
        >
          Guardar Asistencias
        </Button>
      </form>
    </div>
  );
};

export default GroupAttendanceModalForm;
