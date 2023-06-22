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
            Sedes
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl py-16 px-8">
        <div className="my-16 grid grid-cols-2 gap-16">
          <div className="mx-auto w-full max-w-md pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <iframe
                className="mx-auto h-96 w-96 border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.0150537018076!2d-71.59609618520031!3d10.655938092403362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e89988d9e3b278d%3A0xdbd835480d8820b6!2sCanchas%20de%20Tenis!5e0!3m2!1sen!2sco!4v1686943482664!5m2!1sen!2sco"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Vereda del lago
            </h1>
          </div>

          <div className="mx-auto w-full max-w-md pb-24">
            <div className="card-gradient mx-auto max-w-md pt-24">
              <iframe
                className="mx-auto h-96 w-96 border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.2055375995146!2d-71.61376967148848!3d10.670908899339228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8998ddef4eaa75%3A0xf6d5ec4722557eef!2sAcademia%20de%20Tenis%20Victor%20Ramos!5e0!3m2!1sen!2sco!4v1686944161658!5m2!1sen!2sco"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <h1 className="mt-8 text-center font-display text-4xl font-semibold uppercase">
              Claret
            </h1>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
