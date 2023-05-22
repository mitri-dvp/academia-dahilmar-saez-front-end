import type { FC } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  BurgerSVG,
  CrossSVG,
  BellSVG,
  PersonSVG,
  LogOutSVG,
} from "@components/SVG";
import { dashboardNavItems } from "@utils/navigation";
import { useUserStore } from "@store/user";

const DashboardHeader: FC = () => {
  // Open / Close Mobile Nav
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { user } = useUserStore();
  const { logout } = useUserStore();

  return (
    <header
      className={`fixed z-20 w-full bg-white text-dark-500 shadow-lg transition`}
    >
      <div className="mx-auto flex h-20 w-full max-w-screen-xl items-center justify-between px-8 md:justify-start md:space-x-10">
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            type="button"
            className={`inline-flex items-center justify-center p-2 text-gray-400 transition ease-in-out hover:text-gray-900 focus:text-gray-900`}
          >
            <BurgerSVG className="h-6 w-6 stroke-gray-900" />
          </button>
        </div>

        <div className="flex flex-1 gap-8">
          <div className="ml-auto">
            <BellSVG className="h-6 w-6 cursor-pointer text-dark-500" />
          </div>

          <Link className="flex w-max gap-4" href="/dashboard/profile">
            <PersonSVG className="h-6 w-6 text-dark-500" />
            <span className="font-display font-semibold uppercase tracking-wide">
              {user.firstName} {user.lastName}
            </span>
          </Link>
        </div>

        <div
          className={`absolute top-0 bottom-0 -left-0 z-20 min-h-screen w-64 bg-white shadow-lg transition-all md:-left-10 md:-translate-x-0 ${
            open ? "-translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full divide-y-2 divide-gray-50 bg-white">
            <div className="space-y-6 px-5 pt-5 pb-6">
              <nav className="grid gap-y-12">
                <button
                  onClick={() => setOpen(!open)}
                  aria-label="Toggle Menu"
                  type="button"
                  className={`-m-3 -mt-2 flex items-center space-x-3 px-8 py-4 font-display text-lg font-semibold uppercase tracking-wide text-gray-400 transition  ease-in-out hover:bg-gray-50 hover:text-gray-900 focus:text-gray-900 md:hidden`}
                >
                  <CrossSVG className="h-6 w-6 stroke-gray-900" />
                </button>
                <Link
                  href="/dashboard/"
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
                {dashboardNavItems.map((item, index) => {
                  return (
                    <Link
                      key={`nav-${index}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`text-md -m-3 flex items-center gap-4 space-x-3 px-8 py-4 font-display font-semibold uppercase tracking-wide transition ${
                        router.pathname === item.href
                          ? "bg-gray-100 hover:border-b-white"
                          : "hover:border-b-dark-500 hover:bg-gray-50"
                      }`}
                    >
                      {item.Icon({
                        className: `h-6 w-6 transition hover:fill-white ${
                          router.pathname === item.href
                            ? "text-secondary-500"
                            : "text-dark-500"
                        }`,
                      })}
                      {item.title}
                    </Link>
                  );
                })}

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
