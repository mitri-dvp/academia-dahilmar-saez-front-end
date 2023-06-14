import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";
import dayjs from "@utils/dayjs";

import {
  ChevronLeftSVG,
  ChevronRightSVG,
  PlusCircleDottedSVG,
  SpinnerSVG,
} from "@components/SVG";

import { get } from "@services/event";
import Button from "@components/Button";
import { useUserStore } from "@store/user";
import { USER_ROLES } from "@utils/global";
import CalendarEventAddModal from "@components/Calendar/CalendarEventAddModal";
import CalendarTableBody from "@components/Calendar/CalendarTableBody";

const Calendar: NextPage = () => {
  const userStore = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const [initialDate, setInitialDate] = useState(dayjs());

  const handleDateReset = () => {
    setInitialDate(dayjs());
  };

  const handleDateIncrement = () => {
    setInitialDate(initialDate.add(1, "month"));
  };
  const handleDateDecrement = () => {
    setInitialDate(initialDate.subtract(1, "month"));
  };

  return (
    <DashboardLayout>
      <Seo
        title="Calendario | Academia Dahilmar Sáez"
        description="Calendario | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="w-max bg-white p-16 shadow-lg">
          <div className="flex">
            <h1 className="ml-2 font-display text-6xl font-semibold uppercase">
              {initialDate.format("MMMM YYYY")}
            </h1>
            <div className="ml-auto flex items-center justify-center gap-2">
              <div onClick={handleDateDecrement}>
                <ChevronLeftSVG className="h-12 w-12 cursor-pointer text-secondary-500" />
              </div>
              <div onClick={handleDateReset}>
                <span className="cursor-pointer font-display text-4xl font-semibold uppercase">
                  Hoy
                </span>
              </div>
              <div onClick={handleDateIncrement}>
                <ChevronRightSVG className="h-12 w-12 cursor-pointer text-secondary-500" />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="w-full bg-white pt-16">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <table className="mt-8 w-full border-separate border-spacing-2 bg-white text-sm">
              <thead className="rounded-full text-white">
                <tr>
                  {[
                    "Domingo",
                    "Lunes",
                    "Martes",
                    "Miercoles",
                    "Jueves",
                    "Viernes",
                    "Sabado",
                  ].map((day) => (
                    <th key={day} className="rounded-md bg-secondary-500 p-4">
                      <span className="select-none font-bold uppercase tracking-wide">
                        {day}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <CalendarTableBody initialDate={initialDate} />
            </table>
          )}
          {userStore.user.role.type === USER_ROLES.TRAINER ? (
            <div
              className="mt-8 w-full px-2"
              onClick={() => setShowModal(true)}
            >
              <Button styles="flex items-center justify-center gap-4 w-full py-6 text-2xl">
                <PlusCircleDottedSVG className="h-8 w-8" />
                Crear nuevo Evento
              </Button>
            </div>
          ) : null}
        </div>
        {/* Works in Prod */}
        {/* {showModal ? ( */}
        <CalendarEventAddModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
        {/* ) : null} */}
      </section>
    </DashboardLayout>
  );
};

export default Calendar;
