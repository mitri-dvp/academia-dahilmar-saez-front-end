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

      <section className="relative w-full">
        <Image
          className="pt-28"
          src={"/img/hero-bg.jpg"}
          alt="hero-image"
          width={1800}
          height={600}
        />
        <div className="absolute top-1/2 left-0 right-0 mx-auto w-full max-w-screen-xl translate-y-1/2 px-8">
          <h1 className="-translate-y-16 font-display text-6xl font-semibold uppercase text-white">
            Horarios
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl py-16 px-8">
        <div className="my-16 grid grid-cols-2 gap-16">
          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Clases de Tenis
            </h1>
            <p className="mt-2 text-center font-display text-2xl font-semibold uppercase text-gray-500">
              8 - 18 años
            </p>
            <p className="mt-8 text-center text-xl tracking-wide">
              Todos los Días
            </p>
            <p className="mt-2 text-center text-xl tracking-wide">
              3:00 p.m. hasta las 6:00 p.m.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Clases de Mini Tenis
            </h1>
            <p className="mt-2 text-center font-display text-2xl font-semibold uppercase text-gray-500">
              3 - 7 años
            </p>
            <p className="mt-8 text-center text-xl tracking-wide">
              Todos los Días
            </p>
            <p className="mt-2 text-center text-xl tracking-wide">
              3:00 p.m. hasta las 6:00 p.m.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Clases de Tenis Adultos
            </h1>
            <p className="mt-2 text-center font-display text-2xl font-semibold uppercase text-gray-500">
              18 años en adelante
            </p>
            <p className="mt-8 text-center text-xl tracking-wide">
              Lunes - Jueves
            </p>
            <p className="mt-2 text-center text-xl tracking-wide">
              4:00 p.m. hasta las 6:00 p.m.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Clases de Tenis Competencia
            </h1>
            <p className="mt-2 text-center font-display text-2xl font-semibold uppercase text-gray-500">
              9 años en adelante
            </p>
            <p className="mt-8 text-center text-xl tracking-wide">
              Todos los Días
            </p>
            <p className="mt-2 text-center text-xl tracking-wide">
              3:00 p.m. hasta las 6:00 p.m.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/schedule/clase-de-tenis.jpg"
                alt="clase-de-tenis"
                width={380}
                height={380}
              />
            </div>

            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Clases de Tenis Privada
            </h1>
            <Link href="/contact">
              <p className="mt-8 text-center font-display text-2xl font-semibold uppercase text-gray-500  hover:underline">
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
