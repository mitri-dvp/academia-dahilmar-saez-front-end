import type { FC } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { BurgerSVG, CrossSVG, PersonSVG, LogOutSVG } from "@components/SVG";
import { dashboardNavItems } from "@utils/navigation";
import { useUserStore } from "@store/user";
import { getImageURL } from "@utils/media";
import NotificationsButton from "@components/Button/NotificationsButton";

const DashboardHeader: FC = () => {
  // Open / Close Mobile Nav
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { user } = useUserStore();
  const { logout } = useUserStore();

  const displayDashboardNavItems = () => {
    const navItems = dashboardNavItems[user.role.type] || [];

    const isActive = (type: string) => {
      if (type === "dashboard") {
        return router.pathname === `/${type}/${user.role.type}`;
      }
      if (type !== "dashboard") {
        return router.pathname.includes(type);
      }
    };

    return navItems.map((item, index) => {
      return (
        <Link
          key={`nav-${index}`}
          href={item.href}
          onClick={() => setOpen(false)}
          className={`text-md -m-3 flex items-center gap-4 space-x-3 px-8 py-4 font-display font-semibold uppercase tracking-wide transition-all ${
            isActive(item.type)
              ? "bg-secondary-50 text-secondary-500"
              : "hover:bg-gray-100"
          }`}
        >
          {item.Icon({
            className: `h-6 w-6 transition hover:fill-white ${
              isActive(item.type) ? "text-secondary-500" : "text-dark-500"
            }`,
          })}
          {item.title}
        </Link>
      );
    });
  };

  const getPageTitle = (pathname: string) => {
    const navItems = dashboardNavItems[user.role.type] || [];
    const navItem = navItems.find((item) => {
      if (item.type === "dashboard") {
        return router.pathname === `/${item.type}/${user.role.type}`;
      }
      if (item.type !== "dashboard") {
        return pathname.includes(item.type);
      }
    });

    if (navItem) {
      return (
        <span className="ml-8 flex gap-4 font-display font-semibold uppercase tracking-wide md:ml-56">
          {navItem.Icon({
            className: `h-6 w-6 text-dark-500 transition hover:fill-white`,
          })}
          {navItem.title}
        </span>
      );
    }

    return null;
  };

  return (
    <header
      className={`fixed z-20 w-full bg-white text-dark-500 shadow-sm transition`}
    >
      <div className="mr-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-8 md:justify-start md:space-x-10">
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            type="button"
            className={`inline-flex items-center justify-center p-2 text-gray-400 transition ease-in-out hover:text-gray-900 focus:text-gray-900`}
          >
            <BurgerSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
          </button>
        </div>

        <div className="flex flex-1 gap-8 ">
          {getPageTitle(router.pathname)}

          <NotificationsButton />

          <Link className="w- flex gap-4" href="/dashboard/profile">
            {user.photo ? (
              <div className="relative my-auto h-6 w-11">
                <Image
                  className="aspect-square h-11 w-11 -translate-y-2 rounded-full object-cover"
                  src={getImageURL(user.photo)}
                  alt={user.photo.name}
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              <div className="relative my-auto h-6 w-6">
                <PersonSVG className="aspect-square h-6 w-6" />
              </div>
            )}
            <span className="max-w-[100px] font-display font-semibold uppercase tracking-wide line-clamp-1">
              {user.firstName} {user.lastName[0]}.
            </span>
          </Link>
        </div>

        <div
          className={`absolute top-0 bottom-0 -left-0 z-20 min-h-screen w-64 bg-white shadow-sm transition-all md:-left-10 md:-translate-x-0 ${
            open ? "-translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full divide-y-2 bg-white shadow-sm">
            <div className="space-y-6 px-5 pt-5 pb-6">
              <nav className="grid gap-y-12">
                <button
                  onClick={() => setOpen(!open)}
                  aria-label="Toggle Menu"
                  type="button"
                  className={`-m-3 -mt-2 flex items-center space-x-3 px-8 py-4 font-display text-lg font-semibold uppercase tracking-wide text-gray-400 transition  ease-in-out hover:bg-gray-50 hover:text-gray-900 focus:text-gray-900 md:hidden`}
                >
                  <CrossSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
                </button>
                <Link
                  href={`/dashboard/${user.role.type}`}
                  className="mx-auto hidden items-center md:mx-0 md:flex"
                >
                  <Image
                    className="z-50 mx-auto h-20 w-auto"
                    src="/logo.png"
                    alt="academia-dahilmar-saez-logo"
                    width={300}
                    height={40}
                  />
                </Link>

                {displayDashboardNavItems()}

                <div
                  className={`text-md -m-3 flex cursor-pointer items-center gap-4 space-x-3 px-8 py-4 font-display font-semibold uppercase tracking-wide transition hover:border-b-dark-500 hover:bg-gray-50`}
                  onClick={() => logout()}
                >
                  <LogOutSVG
                    className={`h-6 w-6 text-dark-500 transition hover:fill-white`}
                  />
                  Cerrar Sesión
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
