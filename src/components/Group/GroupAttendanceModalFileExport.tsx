import Button from "@components/Button";
import { CalendarSVG, ExcelSVG, SpinnerSVG } from "@components/SVG";
import { exportAttendances } from "@services/group";
import { useGroupStore } from "@store/group";
import { useToastStore } from "@store/toast";
import { exportExcel } from "@utils/fileExport";
import { USER_ROLES } from "@utils/global";
import type { Dayjs } from "dayjs";
import dayjs from "@lib/dayjs";

import { useState } from "react";

const GroupAttendanceModalFileExport: ({
  selectedDate,
}: {
  selectedDate: Dayjs;
}) => JSX.Element = ({ selectedDate }) => {
  const { selectedGroup } = useGroupStore();
  const { addToast } = useToastStore();

  const [excelLoading, setExcelLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const range = {
    day: "day",
    week: "week",
    month: "month",
  };

  const [selectedRange, setSelectedRange] = useState(range.day);

  const group = selectedGroup as Group;

  const handleExportPDF = () => {
    console.log("PDF");
  };
  const handleExportExcel = async () => {
    if (excelLoading) return;
    try {
      setExcelLoading(true);
      const attendances = await exportAttendances(
        group.id,
        selectedDate.format("YYYY-MM-DD"),
        selectedRange
      );

      await exportExcel(attendances, group, selectedDate, selectedRange);
      setExcelLoading(false);
    } catch (error) {
      console.log(error);
      setExcelLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 mt-8 text-center font-display text-lg font-semibold uppercase md:text-2xl">
        Exportar Asistencias {group.name}
      </div>
      <div className="space-y-8 text-sm md:text-base">
        <div className="flex select-none justify-center gap-1 text-center text-base font-bold text-dark-500 md:text-xl">
          <div className="capitalize">{selectedDate.format("dddd, DD")}</div>
          <div className="">de</div>
          <div className="capitalize">{selectedDate.format("MMMM")}</div>
          <div className="">del</div>
          <div className="capitalize">{selectedDate.format("YYYY")}</div>
        </div>
        <div className="flex gap-8 text-white">
          <div
            className={`flex flex-1 flex-col-reverse items-center gap-4 transition hover:border-secondary-500 dark:border-dark-500 ${
              selectedRange === range.day ? "border-secondary-500" : ""
            }`}
          >
            <input
              defaultChecked
              id={`role-${range.day}`}
              type="radio"
              value={range.day}
              onChange={() => setSelectedRange(range.day)}
              name="option"
              className=" dark:focus:ring-setext-secondary-500 dark: peer mr-4 h-4 w-4 cursor-pointer bg-gray-100 text-secondary-500 focus:ring-2 focus:ring-secondary-300 dark:ring-offset-gray-800"
            />
            <label
              htmlFor={`role-${range.day}`}
              className="flex aspect-square w-full cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-md border-2 border-secondary-500 bg-secondary-500 p-4 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-700"
            >
              <CalendarSVG className="h-8 w-8" />
              <span>Dia</span>
            </label>
          </div>

          <div
            className={`flex flex-1 flex-col-reverse items-center gap-4 transition hover:border-secondary-500 dark:border-dark-500 ${
              selectedRange === range.week ? "border-secondary-500" : ""
            }`}
          >
            <input
              id={`role-${range.week}`}
              type="radio"
              value={range.week}
              onChange={() => setSelectedRange(range.week)}
              name="option"
              className=" dark:focus:ring-setext-secondary-500 dark: peer mr-4 h-4 w-4 cursor-pointer bg-gray-100 text-secondary-500 focus:ring-2 focus:ring-secondary-300 dark:ring-offset-gray-800"
            />
            <label
              htmlFor={`role-${range.week}`}
              className="flex aspect-square w-full cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-md border-2 border-secondary-500 bg-secondary-500 p-4 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-700"
            >
              <CalendarSVG className="h-8 w-8" />
              <span>Semana</span>
            </label>
          </div>
          <div
            className={`flex flex-1 flex-col-reverse items-center gap-4 transition hover:border-secondary-500 dark:border-dark-500 ${
              selectedRange === range.month ? "border-secondary-500" : ""
            }`}
          >
            <input
              id={`role-${range.month}`}
              type="radio"
              value={range.month}
              onChange={() => setSelectedRange(range.month)}
              name="option"
              className=" dark:focus:ring-setext-secondary-500 dark: peer mr-4 h-4 w-4 cursor-pointer bg-gray-100 text-secondary-500 focus:ring-2 focus:ring-secondary-300 dark:ring-offset-gray-800"
            />
            <label
              htmlFor={`role-${range.month}`}
              className="flex aspect-square w-full cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-md border-2 border-secondary-500 bg-secondary-500 p-4 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-700"
            >
              <CalendarSVG className="h-8 w-8" />
              <span>Mes</span>
            </label>
          </div>
        </div>
        <div className="flex gap-4">
          {/* <Button onClick={handleExportPDF} styles="w-full">
            {pdfLoading ? (
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin" />
            ) : (
              "Exportar PDF"
            )}
          </Button> */}
          <Button onClick={handleExportExcel} styles="w-full" color="clear">
            {excelLoading ? (
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ExcelSVG className="h-6 w-6" />
                Exportar Excel
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupAttendanceModalFileExport;
