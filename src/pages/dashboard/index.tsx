import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import { dashboardNavItems } from "@utils/navigation";
import { useUserStore } from "@store/user";
import Link from "next/link";

const Dashboard: NextPage = () => {
  const { user } = useUserStore();

  const navItems = dashboardNavItems[user.role.type] || [];

  const featuredItemsList = {
    attendance: true,
    schedule: true,
    calendar: true,
    chats: true,
  };

  const featureNavItems = navItems.filter(
    (item) => featuredItemsList[item.type as keyof typeof featuredItemsList]
  );

  return (
    <DashboardLayout>
      <Seo
        title="Panel | Academia Dahilmar Sáez"
        description="Panel | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="grid grid-cols-2 gap-6 bg-white p-6 shadow-lg">
          {featureNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex h-80 w-full items-center justify-center gap-8 space-x-3 px-8 py-4 font-display text-4xl font-semibold uppercase tracking-wide transition hover:border-b-dark-500 hover:bg-gray-50`}
            >
              {item.Icon({
                className: `h-16 w-16 transition hover:fill-white text-dark-500
          `,
              })}
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
