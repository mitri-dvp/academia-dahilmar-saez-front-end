import type { FC, ReactNode } from "react";
import { Fragment, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import DashboardHeader from "@components/Dashboard/DashboardHeader";
import DashboardFooter from "@components/Dashboard/DashboardFooter";
import { useUserStore } from "@store/user";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUserStore();
  const router = useRouter();

  const checkRoleRedirect = useCallback(() => {
    if (user.role.type === "") {
      router.replace("/login");
    }
  }, [router, user.role.type]);

  useEffect(() => {
    checkRoleRedirect();
  }, [checkRoleRedirect]);

  if (user.role.type !== "") {
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
  }

  return <Fragment />;
};

export default DashboardLayout;
