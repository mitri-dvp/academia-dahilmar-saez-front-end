import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";

import useScrollPosition from "@hooks/useScrollPosition";
import Button from "@components/Button";
import { navItems } from "@utils/navigation";

const Header: FC = () => {
  // Open / Close Mobile Nav
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const scrollPosition = useScrollPosition();

  return (
    <header
      className={`fixed z-20 w-full bg-white text-dark-500 shadow-sm transition ${
        open ? "bg-white transition-none" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-screen-xl px-8">
        <div className="flex items-center justify-between py-5 md:justify-start md:space-x-10">
          <div className="w-0 flex-1">
            <Link href="/" className="flex w-max items-center">
              <Image
                className="z-50 h-10 w-auto md:h-20"
                src="/logo.png"
                alt="academia-dahilmar-saez-logo"
                width={300}
                height={40}
              />
            </Link>
          </div>

          <nav className="hidden flex-1 space-x-6 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`border border-b-2 border-transparent font-display font-semibold uppercase tracking-wide underline-offset-8 transition ${
                  router.pathname === item.href
                    ? "text-secondary-500 hover:border-b-secondary-500"
                    : "hover:border-b-dark-500"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="hidden flex-1 md:block">
            <Link className="ml-auto block w-max" href="/login">
              <Button styles="px-12">Ingresar</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
              type="button"
              className={`inline-flex items-center justify-center p-2 text-gray-400 transition ease-in-out hover:text-gray-900 focus:text-gray-900`}
            >
              <svg
                className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500"
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
            className={`absolute inset-x-0 top-20 z-20 origin-top-right transform p-0 transition md:hidden ${
              open ? "block" : "hidden"
            }`}
          >
            <div className="shadow-lg">
              <div className="divide-y-2 divide-gray-50 bg-white">
                <div className="space-y-6 px-5 pt-5 pb-6">
                  <div>
                    <nav className="grid gap-y-8">
                      {navItems.map((item, index) => {
                        return (
                          <Link
                            key={`nav-${index}`}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="-m-3 flex items-center space-x-3 px-8 py-4 font-display text-lg font-semibold uppercase tracking-wide transition hover:bg-gray-50"
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                      <Button styles="-m-3 flex items-center  bg-secondary-500 px-8 py-4 font-display text-lg font-semibold uppercase tracking-wide text-white transition hover:bg-secondary-700">
                        <Link href="/login" onClick={() => setOpen(false)}>
                          Ingresar
                        </Link>
                      </Button>
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
