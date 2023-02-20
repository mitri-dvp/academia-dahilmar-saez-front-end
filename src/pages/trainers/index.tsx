import Layout from "@components/Layout";
import Seo from "@components/Seo";
import type { NextPage } from "next";
import Image from "next/image";
import React from "react";

const Trainers: NextPage = () => {
  return (
    <Layout>
      <Seo
        title="Entrenadores | Academia Dahilmar Sáez"
        description="Entrenadores | Academia Dahilmar Sáez"
      />

      <section className="relative w-full">
        <Image
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

      <section className="mx-auto w-full max-w-screen-xl p-8">
        Lorem, ipsum.
      </section>
    </Layout>
  );
};

export default Trainers;
