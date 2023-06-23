import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

import { PlusCircleDottedSVG, SpinnerSVG } from "@components/SVG";

import { useGroupStore } from "@store/group";
import { get } from "@services/group";
import GroupAddModal from "@components/Group/GroupAddModal";
import GroupModal from "@components/Group/GroupModal";

const Group: NextPage = () => {
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
        title="Grupos | Academia Dahilmar Sáez"
        description="Grupos | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-white md:py-14 md:px-10">
        <div>
          <h1 className="mb-10 font-display text-6xl font-semibold uppercase">
            Grupos
          </h1>
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto mb-6 h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              <div
                className="flex h-72 w-72 cursor-pointer select-none flex-col items-center justify-center gap-4 bg-secondary-500 px-12 py-5 text-center font-display text-2xl font-semibold uppercase text-white transition-all hover:bg-secondary-700"
                onClick={() => setShowModal(true)}
              >
                <PlusCircleDottedSVG className="h-12 w-12" />
                <span>Agregar</span>
              </div>
              {groupStore.groups.map((group) => (
                <div
                  key={group.id}
                  className="flex h-72 w-72 cursor-pointer select-none flex-col items-center justify-center gap-4 border border-gray-300 px-12 py-5 text-center font-display text-2xl font-semibold uppercase transition-all hover:bg-gray-100"
                  onClick={() => handleSelectGroup(group)}
                >
                  <span>{group.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {showModal ? (
          <GroupAddModal
            showModal={showModal}
            onClose={() => setShowModal(false)}
          />
        ) : null}
        {groupStore.selectedGroup ? (
          <GroupModal
            showModal={Boolean(groupStore.selectedGroup)}
            onClose={() => handleSelectGroup(null)}
          />
        ) : null}
      </section>
    </DashboardLayout>
  );
};

export default Group;
