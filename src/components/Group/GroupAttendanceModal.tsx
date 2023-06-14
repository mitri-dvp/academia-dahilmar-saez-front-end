import { useEffect, useState } from "react";
import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import React from "react";
import { ChevronLeftSVG, ChevronRightSVG, CrossSVG, SpinnerSVG } from "../SVG";
import { useGroupStore } from "@store/group";
import { create } from "@services/schedule";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import dayjs from "@utils/dayjs";
import { getAttendances } from "@services/group";
import GroupAttendanceModalForm from "./GroupAttendanceModalForm";

const GroupAttendanceModal: ({
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
        // handleSuccess();
        // onClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  const orderedSchedules = group
    ? [...group.schedules].sort(
        (a, b) => dayjs(a.datetime).get("day") - dayjs(b.datetime).get("day")
      )
    : [];

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    if (!isLoading) {
      setIsLoading(true);
      getAttendances(groupID, selectedDate.format("YYYY-MM-DD"), {
        signal: abortController.signal,
      })
        .then((attendances) => {
          setAttendances(attendances);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }

    return () => {
      abortController.abort();
    };
  }, [selectedDate]);

  useEffect(() => {
    if (group) {
      let nextSchedule = undefined;

      let i = 0;
      while (!nextSchedule) {
        nextSchedule = orderedSchedules.find(
          (schedule) =>
            dayjs(schedule.datetime).format("dddd") ===
            dayjs().add(i, "day").format("dddd")
        );
        i++;
        if (i > 7) break;
      }

      if (dayjs().diff(dayjs().add(i - 1, "day"), "milliseconds") < 0) {
        let prevSchedule = undefined;

        let j = 0;
        while (!prevSchedule) {
          j++;
          prevSchedule = orderedSchedules.find(
            (schedule) =>
              dayjs(schedule.datetime).format("dddd") ===
              dayjs()
                .add(i - 1, "day")
                .subtract(j, "day")
                .format("dddd")
          );
          if (j > 7) break;
        }

        setIsLoading(false);
        setSelectedDate(
          dayjs()
            .add(i - 1, "day")
            .subtract(j, "day")
        );
        return;
      }

      setIsLoading(false);
      setSelectedDate(dayjs().add(i - 1, "day"));
    }
  }, []);

  const renderHeader = () => {
    const goToPrevSchedule = () => {
      if (isLoading) return;
      if (!group) return;

      let prevSchedule = undefined;

      let i = 0;
      while (!prevSchedule) {
        i++;
        prevSchedule = orderedSchedules.find(
          (schedule) =>
            dayjs(schedule.datetime).format("dddd") ===
            selectedDate.subtract(i, "day").format("dddd")
        );
        if (i > 7) break;
      }

      setSelectedDate(selectedDate.subtract(i, "day"));
    };

    const goToNextSchedule = () => {
      if (isLoading) return;
      if (!group) return;

      let nextSchedule = undefined;

      let i = 0;
      while (!nextSchedule) {
        i++;
        nextSchedule = orderedSchedules.find(
          (schedule) =>
            dayjs(schedule.datetime).format("dddd") ===
            selectedDate.add(i, "day").format("dddd")
        );
        if (i > 7) break;
      }

      if (dayjs().diff(selectedDate.add(i, "day"), "milliseconds") < 0) {
        // TO-DO Add better feedback
        // Restriction Can't access a future date
        return;
      }

      setSelectedDate(selectedDate.add(i, "day"));
    };

    return (
      <h1 className="flex items-center justify-between text-base font-semibold">
        <div className="cursor-pointer" onClick={goToPrevSchedule}>
          <ChevronLeftSVG className="h-5 w-5 text-secondary-500" />
        </div>
        <h1 className="tex/t-dark-500 text-xl font-bold capitalize">
          {selectedDate.format("dddd DD/MM/YY")}
        </h1>
        <div className="cursor-pointer" onClick={goToNextSchedule}>
          <ChevronRightSVG className="h-5 w-5 text-secondary-500" />
        </div>
      </h1>
    );
  };

  if (!group) return <React.Fragment />;

  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          <div className="flex justify-end">
            <button onClick={onClose} type="button">
              <CrossSVG className="h-6 w-6 stroke-gray-900" />
            </button>
          </div>
          <div>
            <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
              Asistencias {group.name}
            </div>

            <div className="space-y-8">
              <div className="mx-auto w-96">{renderHeader()}</div>

              {isLoading ? (
                <div className="flex h-96 items-center justify-center">
                  <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
                </div>
              ) : (
                <GroupAttendanceModalForm
                  group={group}
                  attendances={attendances}
                  selectedDate={selectedDate.format()}
                  onSubmit={(attendances) => setAttendances(attendances)}
                />
              )}
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default GroupAttendanceModal;