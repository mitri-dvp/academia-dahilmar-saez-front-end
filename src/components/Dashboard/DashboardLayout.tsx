import type { FC, ReactNode } from "react";

import DashboardHeader from "@components/Dashboard/DashboardHeader";
import DashboardFooter from "@components/Dashboard/DashboardFooter";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <DashboardHeader />

      <div className="ml-0 transition-all md:ml-64">
        <main className="relative flex min-h-screen w-full flex-col pt-20">
          {children}
        </main>
        <DashboardFooter />
      </div>
    </>
  );
};

export default DashboardLayout;
