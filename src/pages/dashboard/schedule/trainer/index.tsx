import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import dayjs from "@utils/dayjs";

import {
  PlusCircleDottedSVG,
  SpinnerSVG,
  TennisBallSVG,
  TennisRaquetSVG,
} from "@components/SVG";

import { useGroupStore } from "@store/group";
import { get } from "@services/group";
import { USER_ROLES } from "@utils/global";
import ScheduleAddModal from "@components/Schedule/ScheduleAddModal";

const Schedule: NextPage = () => {
  const { groups } = useGroupStore();

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const renderGroups = () => {
    const groupCardsList: JSX.Element[] = [];

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
    }

    return groupCardsList;
  };

  return (
    <DashboardLayout>
      <Seo
        title="Horarios | Academia Dahilmar Sáez"
        description="Horarios | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="w-max bg-white p-16 shadow-lg">
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <>
              <div
                className="flex h-96 w-72 cursor-pointer select-none flex-col items-center justify-center gap-4 bg-secondary-500 px-12 py-5 text-center font-display text-2xl font-semibold uppercase text-white"
                onClick={() => setShowModal(true)}
              >
                <PlusCircleDottedSVG className="h-12 w-12" />
                <span>Añadir</span>
              </div>
              <div className="grid grid-cols-4 gap-6">{renderGroups()}</div>
              <ScheduleAddModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
              />
            </>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Schedule;
