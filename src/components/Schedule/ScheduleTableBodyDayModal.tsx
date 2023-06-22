import { useState } from "react";
import Button from "@components/Button";
import {
  CalendarSVG,
  CrossSVG,
  PencilSquareSVG,
  PersonSVG,
  PlusCircleDottedSVG,
  TrashFillSVG,
} from "@components/SVG";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import { useUserStore } from "@store/user";
import dayjs from "@lib/dayjs";
import { USER_ROLES } from "@utils/global";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import Link from "next/link";

const ScheduleTableBodyDayModal: ({
  showModal,
  onClose,
  derivedSchedule,
}: {
  showModal: boolean;
  onClose: () => void;
  derivedSchedule: DerivedSchedule;
}) => JSX.Element = ({ showModal, onClose, derivedSchedule }) => {
  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          <div className="flex justify-end">
            <button onClick={onClose} type="button">
              <CrossSVG className="h-6 w-6 stroke-dark-500" />
            </button>
          </div>
          <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
            {derivedSchedule.group.name}
          </div>
          <div className="mx-auto w-96 space-y-8">
            <div className="text-base">{derivedSchedule.group.description}</div>
            <div className="text-base font-semibold">Entrenadores</div>

            <div className="max-h-72 overflow-y-auto">
              {derivedSchedule.trainers.map((trainer) => {
                return (
                  <div
                    key={trainer.id}
                    className="flex w-full select-none gap-4 bg-white p-3 transition-all hover:bg-gray-100"
                  >
                    <div className="relative my-auto aspect-square h-12 w-12">
                      {trainer.photo ? (
                        <Image
                          className="h-12 w-12 rounded-full object-cover"
                          src={getImageURL(trainer.photo)}
                          alt={trainer.photo.name}
                          width={48}
                          height={48}
                        />
                      ) : (
                        <PersonSVG className="aspect-square h-12 w-12" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-base font-bold text-dark-500">
                        {trainer.firstName} {trainer.lastName}
                      </h1>
                      <Link
                        href={`mailto:${trainer.email}`}
                        className="w-full text-secondary-700 hover:underline"
                      >
                        {trainer.email}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default ScheduleTableBodyDayModal;
