import { useEffect, useState } from "react";
import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import React from "react";
import {
  ChevronLeftSVG,
  ChevronRightSVG,
  CrossSVG,
  DownloadSVG,
  SpinnerSVG,
} from "../SVG";
import { useGroupStore } from "@store/group";

import dayjs from "@lib/dayjs";
import { getAttendances } from "@services/group";
import GroupAttendanceModalForm from "./GroupAttendanceModalForm";
import { useToastStore } from "@store/toast";
import DateSelect from "@components/Input/DateSelect";
import GroupAttendanceModalFileExport from "./GroupAttendanceModalFileExport";

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
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [showFileExport, setShowFileExport] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    if (!isLoading) {
      setIsLoading(true);
      getAttendances(group.id, selectedDate.format(), {
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
      addToast({
        title: "No se puede acceder a una fecha futura",
      });
      return;
    }

    setSelectedDate(selectedDate.add(i, "day"));
  };

  const selectDate = (date: Date) => {
    setSelectedDate(dayjs(date));
  };

  const handleShowDateSelect = () => {
    setShowDateSelect(!showDateSelect);
  };
  const handleToggleShowFileExport = () => {
    setShowFileExport(!showFileExport);
  };

  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-2xl">
          <div className="flex justify-end gap-4">
            <button onClick={handleToggleShowFileExport} type="button">
              <DownloadSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
            </button>
            <button onClick={onClose} type="button">
              <CrossSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
            </button>
          </div>
          {showFileExport ? (
            <GroupAttendanceModalFileExport selectedDate={selectedDate} />
          ) : (
            <div>
              <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
                Asistencias {group.name}
              </div>

              <div className="space-y-8">
                <div className="mx-auto w-96">
                  <div className="flex items-center justify-between text-base font-semibold">
                    <div className="cursor-pointer" onClick={goToPrevSchedule}>
                      <ChevronLeftSVG className="h-5 w-5 text-secondary-500" />
                    </div>
                    <button
                      className="flex cursor-pointer select-none justify-center gap-1 text-center text-xl font-bold text-dark-500 transition-all hover:text-secondary-500"
                      onClick={handleShowDateSelect}
                      onBlur={() => setShowDateSelect(false)}
                    >
                      <div className="capitalize">
                        {selectedDate.format("dddd, DD")}
                      </div>
                      <div className="">de</div>
                      <div className="capitalize">
                        {selectedDate.format("MMMM")}
                      </div>
                      <div className="">del</div>
                      <div className="capitalize">
                        {selectedDate.format("YYYY")}
                      </div>
                    </button>
                    <div
                      className="absolute left-1/2 z-10 w-full max-w-lg -translate-x-1/2 translate-y-2"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showDateSelect ? (
                        <DateSelect
                          selectedDate={selectedDate.toDate()}
                          allowedDays={orderedSchedules.map((schedule) =>
                            dayjs(schedule.datetime).get("day")
                          )}
                          onChange={(date: Date) => {
                            selectDate(date);
                            setShowDateSelect(false);
                          }}
                        />
                      ) : null}
                    </div>

                    <div className="cursor-pointer" onClick={goToNextSchedule}>
                      <ChevronRightSVG className="h-5 w-5 text-secondary-500" />
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex h-[31rem] items-center justify-center">
                    <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
                  </div>
                ) : (
                  <GroupAttendanceModalForm selectedDate={selectedDate} />
                )}
              </div>
            </div>
          )}
        </Content>
      </Portal>
    </Root>
  );
};

export default GroupAttendanceModal;
