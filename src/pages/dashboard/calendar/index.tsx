import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

const Calendar: NextPage = () => {
  return (
    <DashboardLayout>
      <Seo
        title="Calendario | Academia Dahilmar Sáez"
        description="Calendario | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full md:py-14 md:px-10">
        Calendar
      </section>
    </DashboardLayout>
  );
};

export default Calendar;
