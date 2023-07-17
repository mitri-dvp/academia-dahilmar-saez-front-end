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

      <section className="relative mt-20 w-full md:mt-28">
        <Image
          className="h-96 bg-center object-cover md:h-auto"
          src={"/img/hero-bg.jpg"}
          alt="hero-image"
          width={1800}
          height={600}
        />
        <div className="absolute top-1/2 left-0 right-0 mx-auto w-full max-w-screen-xl translate-y-1/2 px-8">
          <h1 className="-translate-y-16 text-center font-display text-2xl font-semibold uppercase text-white md:text-left md:text-6xl">
            Entrenadores
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl py-8 px-8 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:my-16 md:grid-cols-2 md:gap-16">
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
            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
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
            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
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
            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
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
            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
              Ricardo Chacín
            </h1>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Trainers;
