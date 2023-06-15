import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

import { SpinnerSVG } from "@components/SVG";

import { useGroupStore } from "@store/group";
import { get } from "@services/group";
import GroupScheduleModal from "@components/Group/GroupScheduleModal";

const Schedule: NextPage = () => {
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
        title="Horarios | Academia Dahilmar Sáez"
        description="Horarios | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="w-max bg-white p-16 shadow-lg">
          <h1 className="mb-10 font-display text-6xl font-semibold uppercase">
            Horarios
          </h1>
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {groupStore.groups.length === 0 ? (
                <div className="mx-auto mt-16 mb-16 w-56 px-8 text-center font-display text-2xl font-semibold uppercase">
                  Grupos no encontrados
                </div>
              ) : null}
              {groupStore.groups.map((group) => (
                <div
                  key={group.id}
                  className="flex h-72 w-72 cursor-pointer select-none flex-col items-center justify-center gap-4 border border-gray-300 px-12 py-5 text-center font-display text-2xl font-semibold uppercase "
                  onClick={() => handleSelectGroup(group)}
                >
                  <span>{group.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {groupStore.selectedGroup ? (
          <GroupScheduleModal
            showModal={Boolean(groupStore.selectedGroup)}
            onClose={() => handleSelectGroup(null)}
          />
        ) : null}
      </section>
    </DashboardLayout>
  );
};

export default Schedule;
