import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";

import { navItems } from "@utils/navigation";

const Header: FC = () => {
  // Open / Close Mobile Nav
  const [open, setOpen] = useState(false);

  return (
    <header className="relative mx-auto w-full max-w-screen-xl bg-white px-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="w-0 flex-1">
            <Link href="/" className="flex w-max items-center">
              <Image
                className="z-50 h-5 w-auto md:h-10"
                src="/logo.png"
                alt="academia-dahilmar-saez-logo"
                width={300}
                height={40}
              />
            </Link>
          </div>

          <nav className="hidden space-x-6 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="font-display text-xl font-semibold transition focus:outline-none"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition ease-in-out hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6 stroke-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div
            className="absolute inset-x-0 top-20 z-20 origin-top-right transform p-0 transition md:hidden"
            style={{ display: open ? "block" : "none" }}
          >
            <div className="rounded-lg shadow-lg">
              <div className="shadow-xs divide-y-2 divide-gray-50 rounded-lg bg-white">
                <div className="space-y-6 px-5 pt-5 pb-6">
                  <div>
                    <nav className="grid gap-y-8">
                      {navItems.map((item, index) => {
                        return (
                          <Link
                            key={`nav-${index}`}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="hover:border-primary-800 hover:text-primary-800 focus:text-primary-800 -m-3 flex items-center space-x-3 rounded-md px-8 py-4 transition hover:bg-gray-50 focus:outline-none"
                          >
                            <div className="text-xl font-semibold">
                              {item.title}
                            </div>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
