import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import { useUserStore } from "@store/user";
import Link from "next/link";
import Button from "@components/Button";
import DashboardChatSummary from "@components/Dashboard/DashboardChatSummary";
import DashboardNextEvent from "@components/Dashboard/DashboardNextEvent";
import DashboardNextSchedule from "@components/Dashboard/DashboardNextSchedule";
import DashboardWeeklyAttendance from "@components/Dashboard/DashboardWeeklyAttendance";

const Dashboard: NextPage = () => {
  const { user } = useUserStore();

  return (
    <DashboardLayout>
      <Seo
        title="Panel | Academia Dahilmar Sáez"
        description="Panel | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-white md:py-14 md:px-10">
        <h1 className="font-display text-6xl font-semibold uppercase ">
          Bienvenido, {user.firstName} {user.lastName}
        </h1>

        <div className="mt-14 grid grid-cols-2 gap-8">
          {/* <div className="flex h-72 flex-col gap-4 border p-6">
            <header className="flex items-center">
              <h1 className="font-display text-2xl font-semibold uppercase">
                Próxima Clase
              </h1>
              <Link href={"/dashboard/schedule/athlete"} className="ml-auto">
                <Button>Ver Horarios</Button>
              </Link>
            </header>
            <DashboardNextSchedule />
          </div>
          <div className="flex h-72 flex-col gap-4 border p-6">
            <header className="flex items-center">
              <h1 className="font-display text-2xl font-semibold uppercase">
                Asistencia Semanal
              </h1>
              <Link href={"/dashboard/attendance/athlete"} className="ml-auto">
                <Button>Ver Asistencias</Button>
              </Link>
            </header>
            <DashboardWeeklyAttendance />
          </div> */}

          <DashboardNextEvent />

          <DashboardChatSummary />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
