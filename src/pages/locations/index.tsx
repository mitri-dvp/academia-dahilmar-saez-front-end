import type { NextPage } from "next";
import Image from "next/image";

import Layout from "@components/Layout";
import Seo from "@components/Seo";

const Locations: NextPage = () => {
  return (
    <Layout>
      <Seo
        title="Sedes | Academia Dahilmar Sáez"
        description="Sedes | Academia Dahilmar Sáez"
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
            Sedes
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl py-8 px-8 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:my-16 md:grid-cols-2 md:gap-16">
          <div className="mx-auto w-full max-w-md pb-24">
            <div className="card-gradient mx-auto max-w-md px-4 pt-12 md:pt-16">
              <iframe
                className="mx-auto aspect-square max-h-96 w-full max-w-sm border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.0150537018076!2d-71.59609618520031!3d10.655938092403362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e89988d9e3b278d%3A0xdbd835480d8820b6!2sCanchas%20de%20Tenis!5e0!3m2!1sen!2sco!4v1686943482664!5m2!1sen!2sco"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
              Vereda del lago
            </h1>
            <p className="mt-2 text-center font-display text-lg font-semibold uppercase text-gray-500 md:mt-4 md:text-2xl">
              Avenida 2 El Milagro
            </p>
          </div>

          <div className="mx-auto w-full max-w-md pb-24">
            <div className="card-gradient mx-auto max-w-md px-4 pt-12 md:pt-16">
              <iframe
                className="mx-auto aspect-square max-h-96 w-full max-w-sm border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.2055375995146!2d-71.61376967148848!3d10.670908899339228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8998ddef4eaa75%3A0xf6d5ec4722557eef!2sAcademia%20de%20Tenis%20Victor%20Ramos!5e0!3m2!1sen!2sco!4v1686944161658!5m2!1sen!2sco"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <h1 className="mt-4 text-center font-display text-2xl font-semibold uppercase md:mt-8 md:text-4xl">
              Conjunto Residencial Claret
            </h1>
            <p className="mt-2 text-center font-display text-lg font-semibold uppercase text-gray-500 md:mt-4 md:text-2xl">
              Calle 72 entre Avenida 9B y 10
            </p>
            <p className="text-center font-display text-lg font-semibold uppercase text-gray-500 md:text-2xl">
              Local Azotea
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
