import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <Seo
        title="Panel | Academia Dahilmar Sáez"
        description="Panel | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full md:p-14">Dashboard</section>
    </DashboardLayout>
  );
};

export default Dashboard;
