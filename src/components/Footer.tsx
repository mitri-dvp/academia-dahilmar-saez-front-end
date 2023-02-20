import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { navItems, socialItems } from "@utils/navigation";

const Footer: FC = () => {
  return (
    <footer className="relative mx-auto w-full bg-dark-500 px-8 py-8 text-white">
      <div className="mx-auto max-w-screen-xl px-0 md:px-8">
        <div className="flex flex-col items-center pb-6 md:flex-row">
          <Link href="/" className="mx-auto flex items-center md:mx-0">
            <Image
              className="z-50 h-12 w-auto"
              src="/logo.png"
              alt="academia-dahilmar-saez-logo"
              width={300}
              height={40}
            />
          </Link>
          <nav className="mx-auto mt-6 flex flex-wrap gap-6 text-center md:mr-0 md:ml-auto md:flex-row md:flex-nowrap md:space-x-6">
            {navItems.map((item, index) => (
              <div key={index} className="w-full">
                <Link
                  href={item.href}
                  className=" font-display font-semibold uppercase tracking-wide underline-offset-8 hover:underline"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </nav>
        </div>
        <div className="pb-6">
          <div className="mb-6 text-center font-light md:text-left">
            “Guáramo y Corazón“
          </div>
          <div className="flex justify-center gap-8 md:justify-start">
            {socialItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                className="aspect-square"
              >
                {item.Icon({
                  className:
                    "h-6 w-6 fill-gray-300 transition hover:fill-white",
                })}
              </Link>
            ))}
          </div>
        </div>
        <hr className="mb-6 border-gray-400" />
        <p className="mt-2 text-center text-sm text-gray-300 md:text-left">
          ©{new Date().getFullYear()} Academia Dahilmar Sáez. Todos los Derechos
          Reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
