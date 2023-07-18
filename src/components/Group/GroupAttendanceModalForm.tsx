import { useEffect } from "react";
import React from "react";
import { useGroupStore } from "@store/group";
import { USER_ROLES } from "@utils/global";

import { useFormik } from "formik";
import Button from "@components/Button";
import { postAttendances } from "@services/group";
import GroupAttendanceFormItem from "./GroupAttendanceModalFormItem";
import { useAttendanceStore } from "@store/attendance";
import { useToastStore } from "@store/toast";
import type { Dayjs } from "dayjs";

const GroupAttendanceModalForm: ({
  selectedDate,
}: {
  selectedDate: Dayjs;
}) => JSX.Element = ({ selectedDate }) => {
  const { selectedGroup } = useGroupStore();
  const { groupAttendances } = useAttendanceStore();
  const { addToast } = useToastStore();

  const group = selectedGroup as Group;

  const athletes = group.users.filter(
    (user) => user.role.type === USER_ROLES.ATHLETE
  );

  const draftAttendances: DraftAttendance[] = [];

  const formik = useFormik({
    initialValues: {
      draftAttendances: draftAttendances,
    },
    onSubmit: async (values) => {
      try {
        // Action
        await postAttendances(
          group.id,
          selectedDate.toDate(),
          values.draftAttendances
        );
        // On Success
        formik.resetForm();

        addToast({
          title: groupAttendances.length
            ? "Asistencias Actualizadas"
            : "Asistencias Guardadas",
        });
        // onClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  useEffect(() => {
    const draftAttendances: DraftAttendance[] = athletes.map((athlete) => {
      const attendance = groupAttendances.find(
        (groupAttendance) => groupAttendance.user.id === athlete.id
      );
      return {
        id: attendance ? attendance.id : null,
        status: attendance ? attendance.status : false,
        remarks: attendance ? attendance.remarks : "",
        userID: attendance ? attendance.user.id : athlete.id,
      };
    });

    formik.setFieldValue("draftAttendances", draftAttendances);
  }, [groupAttendances]);

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
      <div>
        <div className="flex">
          <div className="flex w-1/2 select-none bg-white px-0.5 py-2 hover:bg-gray-100 md:p-2">
            <h1 className="text-sm font-bold text-dark-500">Nombre</h1>
          </div>
          <div className="flex w-1/3 select-none items-center justify-center bg-white p-0 hover:bg-gray-100">
            <h1 className="text-sm font-bold text-dark-500">Asistencia</h1>
          </div>
          <div className="flex w-1/2 items-center  bg-white px-0.5 py-2 hover:bg-gray-100 md:p-2">
            <h1 className="text-sm font-bold text-dark-500">Observaciones</h1>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {athletes.map((athlete) => (
            <GroupAttendanceFormItem
              key={athlete.id}
              athlete={athlete}
              selectedDate={selectedDate}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>

      <form onClick={formik.handleSubmit} className="mx-auto w-full md:w-1/2">
        <Button
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
          styles="w-full"
        >
          {groupAttendances.length
            ? "Actualizar Asistencias"
            : "Guardar Asistencias"}
        </Button>
      </form>
    </div>
  );
};

export default GroupAttendanceModalForm;
