import type { NextPage } from "next";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import { HourglassSVG, PersonSVG } from "@components/SVG";
import { useUserStore } from "@store/user";

const Pending: NextPage = () => {
  const { user } = useUserStore();

  return (
    <Layout>
      <Seo
        title="Aprobación | Academia Dahilmar Sáez"
        description="Aprobación | Academia Dahilmar Sáez"
      />

      <section className="mx-auto w-full max-w-md space-y-8 px-8 pt-56">
        <div className="relative flex aspect-video w-full items-center gap-8 p-8 shadow-md">
          <div className="w-1/3 shrink-0">
            <PersonSVG className="h-full w-full" />
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="h-5 w-full bg-gray-400" />
            <div className="h-5 w-1/2 bg-gray-400" />
          </div>
          <HourglassSVG className="absolute right-2 bottom-2 z-10 h-12 w-12 translate-y-1/2 translate-x-1/2 rounded-full bg-secondary-500 p-2.5 text-white shadow-md" />
        </div>

        <h1 className="w-full text-center text-lg font-bold">
          En Espera de Aprobación
        </h1>

        <div className="space-y-4 tracking-wide">
          <p>
            Estimado {user.firstName} {user.lastName},
          </p>
          <p>
            Gracias por crear una cuenta con nosotros. Estamos encantados de
            tenerle como miembro de nuestra Academia.
          </p>
          <p>
            Para completar el proceso de creación de la cuenta, sus datos están
            en proceso de verificación.
          </p>
          <p>
            Una vez finalizado este proceso, se le notificará a su dirección de
            correo electrónico.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Pending;
