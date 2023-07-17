import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import { useUserStore } from "@store/user";
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

      <section className="min-h-screen w-full bg-white px-6 py-8 md:py-14 md:px-10">
        <h1 className="font-display text-2xl font-semibold uppercase md:text-6xl ">
          Bienvenido, {user.firstName} {user.lastName}
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2">
          <DashboardNextSchedule />
          <DashboardWeeklyAttendance />
          <DashboardNextEvent />
          <DashboardChatSummary />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
