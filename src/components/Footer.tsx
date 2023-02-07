import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { navItems, socialItems } from "@utils/navigation";

const Footer: FC = () => {
  return (
    <footer className="relative mx-auto w-full max-w-screen-xl bg-white px-8 py-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center pb-6 md:flex-row">
          <Link href="/" className="mx-auto flex items-center md:mx-0">
            <Image
              className="z-50 h-8 w-auto"
              src="/logo.png"
              alt="academia-dahilmar-saez-logo"
              width={300}
              height={40}
            />
          </Link>
          <nav className="mx-auto mt-4 flex flex-wrap text-center md:mr-0 md:ml-auto md:flex-row md:flex-nowrap md:space-x-6">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="mt-4 w-1/2 last:w-full md:mt-0 md:w-full"
              >
                <Link
                  href={item.href}
                  className="text-md font-semibold transition md:text-xl"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </nav>
        </div>
        <div className="pb-6">
          <div className="mb-6 text-center text-xl font-semibold md:text-left">
            Síguenos en nuestras Redes Sociales
          </div>
          <div className="flex justify-center gap-2 md:justify-start">
            {socialItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                className="flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-primary-700 transition"
              >
                {item.Icon({ className: "fill-white h-6 w-6" })}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-2 text-center text-sm text-gray-500 md:text-left md:text-xl">
          ©{new Date().getFullYear()} Academia Dahilmar Saez. Todos los Derechos
          Reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
