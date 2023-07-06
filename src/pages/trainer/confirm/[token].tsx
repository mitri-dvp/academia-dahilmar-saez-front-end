import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import {
  CheckCircleFillSVG,
  CheckCircleSVG,
  CheckSVG,
  HourglassSVG,
  PersonSVG,
  SpinnerSVG,
} from "@components/SVG";
import { useRouter } from "next/router";
import { useParams } from "@hooks/useParams";
import { confirmUser, getUserFromToken } from "@services/user";
import dayjs from "@lib/dayjs";
import Button from "@components/Button";

const Confirm: NextPage = () => {
  const router = useRouter();
  const { token } = useParams();

  const [trainer, setTrainer] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    if (token) {
      setIsLoading(true);

      getUserFromToken(token, {
        signal: abortController.signal,
      })
        .then((trainer) => {
          setTrainer(trainer);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }

    return () => {
      abortController.abort();
    };
  }, [token, router.asPath]);

  const handleConfirm = () => {
    setIsConfirming(true);

    if (token) {
      confirmUser(token)
        .then((trainer) => {
          setTrainer(trainer);
          setIsConfirming(false);
        })
        .catch(() => setIsConfirming(false));
    }
  };

  return (
    <Layout>
      <Seo
        title="Confirmación | Academia Dahilmar Sáez"
        description="Confirmación | Academia Dahilmar Sáez"
      />

      {isLoading ? (
        <section className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center space-y-8 px-8 pt-32">
          <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
        </section>
      ) : (
        <section className="mx-auto w-full max-w-md space-y-8 px-8 pt-56">
          <div className="relative flex aspect-video w-full items-center gap-8 p-8 shadow-md">
            <div className="w-1/3 shrink-0">
              <PersonSVG className="h-full w-full" />
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="h-5 w-full bg-gray-400" />
              <div className="h-5 w-1/2 bg-gray-400" />
            </div>
            {trainer ? (
              <>
                {trainer.confirmed ? (
                  <CheckSVG className="absolute right-2 bottom-2 z-10 h-12 w-12 translate-y-1/2 translate-x-1/2 rounded-full bg-green-400 p-2.5 text-white shadow-md" />
                ) : (
                  <HourglassSVG className="absolute right-2 bottom-2 z-10 h-12 w-12 translate-y-1/2 translate-x-1/2 rounded-full bg-secondary-500 p-2.5 text-white shadow-md" />
                )}
              </>
            ) : null}
          </div>

          {trainer ? (
            <h1 className="w-full text-center text-lg font-bold">
              {trainer.confirmed
                ? "Cuenta Aprobada"
                : "En Espera de Aprobación"}
            </h1>
          ) : null}

          {trainer ? (
            <div className="space-y-4 tracking-wide">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <h1 className="text-sm font-bold text-dark-500">Nombre</h1>
                  <div className="mb-2 w-full text-dark-500">
                    {trainer.firstName} {trainer.lastName}
                  </div>
                </div>
                <div className="w-1/2">
                  <h1 className="text-sm font-bold text-dark-500">Cédula</h1>
                  <div className="mb-2 w-full text-dark-500">
                    {trainer.documentID}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <h1 className="text-sm font-bold text-dark-500">Cédula</h1>
                  <div className="mb-2 w-full text-dark-500">
                    {trainer.documentID}
                  </div>
                </div>
                <div className="w-1/2">
                  <h1 className="text-sm font-bold text-dark-500">
                    Fecha de Nacimiento
                  </h1>
                  <div className="mb-2 w-full text-dark-500">
                    {dayjs(trainer.dateOfBirth).format("DD/MM/YYYY")}
                  </div>
                </div>
              </div>
              <div>
                {!trainer.confirmed ? (
                  <Button onClick={handleConfirm} styles="w-full mt-8">
                    {isConfirming ? (
                      <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-white" />
                    ) : (
                      "Aprobar Cuenta"
                    )}
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>
      )}
    </Layout>
  );
};

export default Confirm;
