import { useEffect, useState } from "react";
import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import React from "react";
import { ChevronLeftSVG, ChevronRightSVG, CrossSVG, SpinnerSVG } from "../SVG";
import { useGroupStore } from "@store/group";

import dayjs from "@lib/dayjs";
import { getAttendances } from "@services/group";
import GroupAttendanceModalForm from "./GroupAttendanceModalForm";
import { useToastStore } from "@store/toast";

const GroupAttendanceModal: ({
  showModal,
  onClose,
}: {
  showModal: boolean;
  onClose: () => void;
}) => JSX.Element = ({ showModal, onClose }) => {
  const { selectedGroup } = useGroupStore();
  const { addToast } = useToastStore();

  const group = selectedGroup as Group;

  const orderedSchedules = group
    ? [...group.schedules].sort(
        (a, b) => dayjs(a.datetime).get("day") - dayjs(b.datetime).get("day")
      )
    : [];

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    if (!isLoading) {
      setIsLoading(true);
      getAttendances(group.id, selectedDate.format("YYYY-MM-DD"), {
        signal: abortController.signal,
      })
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }

    return () => {
      abortController.abort();
    };
  }, [selectedDate]);

  useEffect(() => {
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
  }, []);

  const renderHeader = () => {
    const goToPrevSchedule = () => {
      if (isLoading) return;

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
        addToast({
          title: "No se puede acceder a una fecha futura",
        });
        // Restriction Can't access a future date
        return;
      }

      setSelectedDate(selectedDate.add(i, "day"));
    };

    return (
      <div className="flex items-center justify-between text-base font-semibold">
        <div className="cursor-pointer" onClick={goToPrevSchedule}>
          <ChevronLeftSVG className="h-5 w-5 text-secondary-500" />
        </div>
        <div className="tex/t-dark-500 text-xl font-bold capitalize">
          {selectedDate.format("dddd DD/MM/YY")}
        </div>
        <div className="cursor-pointer" onClick={goToNextSchedule}>
          <ChevronRightSVG className="h-5 w-5 text-secondary-500" />
        </div>
      </div>
    );
  };

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
                  selectedDate={selectedDate.format()}
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
