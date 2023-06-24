import { TennisBallSVG, TennisRaquetSVG } from "@components/SVG";

const DashboardWeeklyAttendance = () => {
  const calendarDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex justify-between font-semibold">
        <div>18/06/2023 - 24/06/2023</div>
        <div>2/2</div>
      </div>
      <div className="grid h-full w-full grid-cols-7 grid-rows-1">
        {calendarDays.map((day) => (
          <div key={day} className="flex justify-center">
            <div
              className={`mt-auto  ${
                day === "Mar" || day === "Jue" ? "h-full" : "h-0.5"
              } w-8 rounded-t-full bg-secondary-500`}
            />
          </div>
        ))}
        {calendarDays.map((day) => (
          <div className="mt-auto pt-4 text-center" key={day}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardWeeklyAttendance;
