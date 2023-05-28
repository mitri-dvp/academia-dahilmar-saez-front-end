import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

const Attendance: NextPage = () => {
  return (
    <DashboardLayout>
      <Seo
        title="Panel | Academia Dahilmar Sáez"
        description="Panel | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="flex w-max gap-16 bg-white p-16 shadow-lg">
          Attendance
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Attendance;
