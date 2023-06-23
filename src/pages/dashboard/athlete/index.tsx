import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import { useUserStore } from "@store/user";
import Link from "next/link";

const Dashboard: NextPage = () => {
  const { user } = useUserStore();

  return (
    <DashboardLayout>
      <Seo
        title="Panel | Academia Dahilmar Sáez"
        description="Panel | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="grid grid-cols-2 gap-6 bg-white p-6 shadow-lg">
          <div>Horario</div>
          <div>Asistencias</div>
          <div>Mensajes</div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
