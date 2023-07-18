import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

import { SpinnerSVG } from "@components/SVG";

import { useGroupStore } from "@store/group";
import { get } from "@services/group";
import Link from "next/link";
import GroupAttendanceModal from "@components/Group/GroupAttendanceModal";

const Attendance: NextPage = () => {
  const groupStore = useGroupStore();

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const handleSelectGroup = (group: Group | null) => {
    groupStore.setSelected(group);
  };

  return (
    <DashboardLayout>
      <Seo
        title="Asistencias | Academia Dahilmar Sáez"
        description="Asistencias | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-white px-6 py-8 md:py-14 md:px-10">
        <div>
          <h1 className="mb-10 font-display text-2xl font-semibold uppercase md:text-6xl">
            Asistencias
          </h1>
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {groupStore.groups.length === 0 ? (
                <div className="col-span-2 mt-16 mb-16 w-full font-display text-lg font-semibold uppercase md:text-2xl">
                  Grupos no encontrados
                </div>
              ) : null}
              {groupStore.groups.map((group) => {
                if (group.schedules.length === 0)
                  return (
                    <Link
                      key={group.id}
                      className="flex aspect-square w-full cursor-pointer select-none flex-col items-center justify-center border border-gray-300 px-2 py-5 text-center font-display text-lg font-semibold uppercase transition-all hover:bg-gray-100 md:gap-4 md:text-xl lg:text-2xl"
                      href={"/dashboard/schedule/trainer"}
                    >
                      <span>{group.name}</span>
                      <span className="text-xs font-semibold text-dark-500 md:text-sm">
                        Horarios no encontrados
                      </span>
                    </Link>
                  );
                return (
                  <div
                    key={group.id}
                    className="flex aspect-square w-full cursor-pointer select-none flex-col items-center justify-center border border-gray-300 px-2 py-5 text-center font-display text-lg font-semibold uppercase transition-all hover:bg-gray-100 md:text-xl lg:text-2xl"
                    onClick={() => handleSelectGroup(group)}
                  >
                    <span>{group.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {groupStore.selectedGroup ? (
          <GroupAttendanceModal
            showModal={Boolean(groupStore.selectedGroup)}
            onClose={() => handleSelectGroup(null)}
          />
        ) : null}
      </section>
    </DashboardLayout>
  );
};

export default Attendance;
