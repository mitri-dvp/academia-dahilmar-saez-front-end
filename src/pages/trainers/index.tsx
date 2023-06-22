import type { NextPage } from "next";
import Image from "next/image";

import Layout from "@components/Layout";
import Seo from "@components/Seo";

const Trainers: NextPage = () => {
  return (
    <Layout>
      <Seo
        title="Entrenadores | Academia Dahilmar Sáez"
        description="Entrenadores | Academia Dahilmar Sáez"
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
            Entrenadores
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl py-16 px-8">
        <div className="my-16 grid grid-cols-2 gap-16">
          <div className="mx-auto w-full max-w-md pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/trainer/carlos-ferrer.png"
                alt="carlos-ferrer"
                width={380}
                height={380}
              />
            </div>
            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Carlos Ferrer
            </h1>
          </div>

          <div className="mx-auto w-full max-w-md pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/trainer/leandro-castillo.png"
                alt="leandro-castillo"
                width={380}
                height={380}
              />
            </div>
            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Leandro Castillo
            </h1>
          </div>

          <div className="mx-auto w-full max-w-md pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/trainer/keyler-carvajal.png"
                alt="keyler-carvajal"
                width={380}
                height={380}
              />
            </div>
            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Keyler Carvajal
            </h1>
          </div>

          <div className="mx-auto w-full max-w-md pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <Image
                className="mx-auto aspect-square h-80 w-80 object-cover"
                src="/img/trainer/ricardo-chacin.png"
                alt="ricardo-chacin"
                width={380}
                height={380}
              />
            </div>
            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Ricardo Chacín
            </h1>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Trainers;
