import type { NextPage } from "next";
import Image from "next/image";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import Link from "next/link";

const Schedule: NextPage = () => {
  return (
    <Layout>
      <Seo
        title="Horarios | Academia Dahilmar Sáez"
        description="Horarios | Academia Dahilmar Sáez"
      />

      <section className="relative mt-20 w-full md:mt-28">
        <Image
          className="h-96 bg-center object-cover md:h-auto"
          src={"/img/hero-bg.jpg"}
          alt="hero-image"
          width={1800}
          height={600}
        />
        <div className="absolute top-1/2 left-0 right-0 mx-auto w-full max-w-screen-xl translate-y-1/2 px-8">
          <h1 className="-translate-y-16 text-center font-display text-4xl font-semibold uppercase text-white md:text-left md:text-6xl">
            Horarios
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl py-8 px-8 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:my-16 md:grid-cols-2 md:gap-16">
          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md px-4 pt-12 md:pt-16">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
              Clases de Tenis
            </h1>
            <p className="text-center font-display text-lg font-semibold uppercase text-gray-500 md:mt-2 md:text-2xl">
              8 - 18 años
            </p>
            <p className="mt-4 text-center text-base tracking-wide md:mt-8 md:text-xl">
              Todos los Días
            </p>
            <p className="mt-2 text-center text-base tracking-wide md:text-xl">
              3:00 p.m. hasta las 6:00 p.m.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md px-4 pt-12 md:pt-16">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
              Clases de Mini Tenis
            </h1>
            <p className="text-center font-display text-lg font-semibold uppercase text-gray-500 md:mt-2 md:text-2xl">
              3 - 7 años
            </p>
            <p className="mt-4 text-center text-base tracking-wide md:mt-8 md:text-xl">
              Todos los Días
            </p>
            <p className="mt-2 text-center text-base tracking-wide md:text-xl">
              3:00 p.m. hasta las 6:00 p.m.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md px-4 pt-12 md:pt-16">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
              Clases de Tenis Adultos
            </h1>
            <p className="text-center font-display text-lg font-semibold uppercase text-gray-500 md:mt-2 md:text-2xl">
              18 años en adelante
            </p>
            <p className="mt-4 text-center text-base tracking-wide md:mt-8 md:text-xl">
              Lunes - Jueves
            </p>
            <p className="mt-2 text-center text-base tracking-wide md:text-xl">
              4:00 p.m. hasta las 6:00 p.m.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md px-4 pt-12 md:pt-16">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
              Clases de Tenis Competencia
            </h1>
            <p className="text-center font-display text-lg font-semibold uppercase text-gray-500 md:mt-2 md:text-2xl">
              9 años en adelante
            </p>
            <p className="mt-4 text-center text-base tracking-wide md:mt-8 md:text-xl">
              Todos los Días
            </p>
            <p className="mt-2 text-center text-base tracking-wide md:text-xl">
              3:00 p.m. hasta las 6:00 p.m.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md px-4 pt-12 md:pt-16">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
              Clases de Tenis Privada
            </h1>
            <Link href="/contact">
              <p className="mt-2 text-center font-display text-lg font-semibold uppercase text-gray-500 hover:underline md:text-2xl">
                Contáctanos
              </p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Schedule;
