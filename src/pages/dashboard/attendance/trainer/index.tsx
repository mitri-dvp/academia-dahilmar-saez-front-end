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
import GroupScheduleModal from "@components/Group/GroupScheduleModal";
import GroupAttendanceModal from "@components/Group/GroupAttendanceModal";

const Attendance: NextPage = () => {
  const { groups } = useGroupStore();

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

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
        title="Asistencias | Academia Dahilmar Sáez"
        description="Asistencias | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="w-max bg-white p-16 shadow-lg">
          <h1 className="ml-2 mb-8 font-display text-6xl font-semibold uppercase">
            Asistencias
          </h1>
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="flex h-72 w-72 cursor-pointer select-none flex-col items-center justify-center gap-4 border border-gray-300 px-12 py-5 text-center font-display text-2xl font-semibold uppercase "
                  onClick={() => setSelectedGroup(group)}
                >
                  <span>{group.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedGroup ? (
          <GroupAttendanceModal
            showModal={Boolean(selectedGroup)}
            onClose={() => setSelectedGroup(null)}
            groupID={selectedGroup.id}
          />
        ) : null}
      </section>
    </DashboardLayout>
  );
};

export default Attendance;
