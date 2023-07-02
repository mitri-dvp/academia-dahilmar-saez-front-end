import { getBase64 } from "@lib/http";
import type { Dayjs, OpUnitType } from "dayjs";
import dayjs from "dayjs";
import exceljs from "exceljs";
import { USER_ROLES } from "./global";

export const exportPDF = () => {
  return "";
};

export const exportExcel = async (
  attendances: Attendance[],
  group: Group,
  selectedDate: Dayjs,
  selectedRange: string
) => {
  const Convert = (px: number) => px * 0.09027;

  const formatRange = (range: string) => {
    switch (range) {
      case "day":
        return "día";
      case "week":
        return "semana";
      case "month":
        return "mes";
      default:
        return "";
    }
  };

  const range = selectedRange as OpUnitType;

  const name =
    `control_de_asistencia_` +
    `${formatRange(range)}_` +
    `${selectedDate.format("DD_MM_YYYY")}`;

  const schedules = group
    ? [...group.schedules].sort(
        (a, b) => dayjs(a.datetime).get("day") - dayjs(b.datetime).get("day")
      )
    : [];

  const athletes = group.users
    .filter((user) => user.role.type === USER_ROLES.ATHLETE)
    .sort((a, b) => Number(a.lastName > b.lastName));

  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet(name);

  const startDate = selectedDate.startOf(range);
  const endDate = selectedDate.endOf(range);

  const attendancesCols = [];
  let currentDate = startDate;
  while (true) {
    const dayMatch = schedules.find(
      (schedule) =>
        dayjs(schedule.datetime).get("day") === currentDate.get("day")
    );

    if (dayMatch) {
      attendancesCols.push({
        name: `${currentDate
          .format("dddd")
          .slice(0, 3)
          .toUpperCase()}-${currentDate.format("DD")}`,
        filterButton: true,
      });
    }

    currentDate = currentDate.add(1, "day");
    if (!currentDate.isBetween(startDate, endDate)) break;
  }

  const attendancesRows = [];
  for (let i = 0; i < athletes.length; i++) {
    const athlete = athletes[i] as User;

    const athleteStatuses = [];
    const athleteRemarks = [];
    for (const attCol of attendancesCols) {
      const day = attCol.name.split("-")[1];

      const athleteAttendance = attendances.find((attendance) => {
        const dateMatch = dayjs(attendance.datetime).format("DD") === day;
        const athleteMatch = attendance.user.id === athlete.id;
        return dateMatch && athleteMatch;
      });

      if (athleteAttendance) {
        // True || False
        athleteStatuses.push(athleteAttendance.status ? "✔" : "✖");
        if (athleteAttendance.remarks)
          athleteRemarks.push(athleteAttendance.remarks);
      } else {
        // Undefined
        athleteStatuses.push("");
      }
    }

    attendancesRows.push([
      i + 1,
      athlete.firstName,
      athlete.lastName,
      ...athleteStatuses,
      athleteRemarks.length ? athleteRemarks.join(";") : "",
    ]);
  }

  // Rows/Cols
  const columns = [
    { name: "#", filterButton: true },
    { name: "NOMBRE", filterButton: true },
    { name: "APELLIDO", filterButton: true },
    ...attendancesCols,
    { name: "OBSERVACIONES", filterButton: true },
  ];

  const table = worksheet.addTable({
    name: `tabla_${name}`,
    ref: "A5",
    headerRow: true,
    style: {
      theme: "TableStyleMedium21",
      showRowStripes: true,
    },
    columns: columns,
    rows: attendancesRows,
  });

  for (let i = 0; i < columns.length; i++) {
    worksheet.getCell(5, i + 1).alignment = { horizontal: "center" };
  }

  if (worksheet.columns[0]) worksheet.columns[0].width = Convert(32);
  if (worksheet.columns[1]) worksheet.columns[1].width = Convert(160);
  if (worksheet.columns[2]) worksheet.columns[2].width = Convert(160);
  for (let i = 0; i < attendancesCols.length; i++) {
    console.log(3 + i);
    const currentCol = worksheet.columns[3 + i];
    if (currentCol) currentCol.width = Convert(144);
  }

  const lastCol = worksheet.columns[3 + attendancesCols.length];
  if (lastCol) lastCol.width = Convert(512);

  for (let colIndex = 4; colIndex < attendancesCols.length + 4; colIndex++) {
    for (let rowIndex = 6; rowIndex < attendancesRows.length + 6; rowIndex++) {
      worksheet.getCell(rowIndex, colIndex).alignment = {
        horizontal: "center",
      };
    }
  }

  // LOGO //
  // Merge Logo Cells
  worksheet.mergeCells("A1:B4");
  // Add Logo Image
  const logoID = workbook.addImage({
    extension: "png",
    base64: await getBase64("/logo.png"),
  });
  worksheet.addImage(logoID, {
    tl: {
      col: 1.2,
      row: 0.5,
    },
    ext: {
      width: 60,
      height: 60,
    },
  });

  // TITLE //
  // Merge Title Cells
  worksheet.mergeCells(1, 3, 4, 3 + attendancesCols.length + 1);
  // Add Title Text
  const titleCell = worksheet.getCell(1, 3);
  titleCell.alignment = { horizontal: "center", vertical: "middle" };
  titleCell.value = "Control de Asistencias";
  titleCell.font = { size: 18 };

  // Metadata
  worksheet.getCell(
    6 + attendancesRows.length,
    3 + attendancesCols.length + 1
  ).value = `Fecha: ${selectedDate.format("DD/MM/YYYY")}`;
  worksheet.getCell(
    7 + attendancesRows.length,
    3 + attendancesCols.length + 1
  ).value = `Grupo: ${group.name}`;
  worksheet.getCell(
    8 + attendancesRows.length,
    3 + attendancesCols.length + 1
  ).value = `Horario: ${schedules
    .map((schedule) => {
      const datetime = dayjs(schedule.datetime);

      return `${datetime
        .format("dddd")
        .slice(0, 3)
        .toUpperCase()} ${datetime.format("hh:mm a")}`;
    })
    .join("; ")}`;
  worksheet.getCell(
    9 + attendancesRows.length,
    3 + attendancesCols.length + 1
  ).value = `Formato: ${formatRange(range).toUpperCase()}`;
  worksheet.getCell(
    10 + attendancesRows.length,
    3 + attendancesCols.length + 1
  ).value = `Impreso: ${dayjs().format("DD/MM/YYYY hh:mm a")}`;

  workbook.xlsx
    .writeBuffer()
    .then((xls64) => {
      // build anchor tag and attach file (works in chrome)
      const a = document.createElement("a");
      const data = new Blob([xls64], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(data);
      a.href = url;
      a.download = `${name}.xlsx`;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
