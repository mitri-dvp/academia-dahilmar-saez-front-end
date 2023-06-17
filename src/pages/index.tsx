// https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress
import { type NextPage } from "next";
import Image from "next/image";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import Button from "@components/Button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo
        title="Academia Dahilmar Sáez"
        description="Academia Dahilmar Sáez"
      />

      <section id="hero" className="relative bg-primary-700">
        <div className="absolute h-full w-full bg-gradient-to-t from-black via-transparent to-transparent " />
        <Image
          className="mx-auto max-h-screen min-h-screen w-full object-cover"
          src="/img/hero-bg-main.jpg"
          alt="academia-dahilmar-saez-hero"
          width={960}
          height={600}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 text-center text-white">
          <h1 className="mx-auto mb-4 w-min font-display text-6xl font-semibold uppercase">
            Academia Dahilmar Saez
          </h1>
          <p className="mb-4">“Guáramo y Corazón“</p>
          <Link href="/schedule">
            <Button styles="mx-auto ">Consigue tu clase gratuita</Button>
          </Link>
        </div>
      </section>

      <section
        id="nosotros"
        className="mx-auto flex w-full max-w-screen-xl flex-col bg-white p-16"
      >
        <h1 className="mb-16 text-center font-display text-6xl font-semibold uppercase">
          Nosotros
        </h1>

        <div className="flex gap-8">
          <div className="my-auto w-1/2 space-y-4 text-justify text-xl tracking-wide">
            <p>
              Somos una Academia de tenis dirigida a entusiastas del deporte que
              buscan el lugar perfecto para jugar y entretenerse. Te acompañamos
              desde la iniciación hasta la mas alta competencia con Guáramo y
              Corazón.
            </p>
            <p>
              Tenemos por objeto fomentar, promover y desarrollar la práctica
              del deporte en general y del tenis en especial, desde una temprana
              edad hasta cualquier edad para que los practicantes vean en el
              Tenis un estilo de vida y tengan opción a una vida saludable.
            </p>
          </div>
          <Image
            className="h-96 w-1/2 object-cover"
            src="https://images.unsplash.com/photo-1615731446707-6ad24074bdd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
            alt="tennis-racket"
            width={2000}
            height={2000}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
