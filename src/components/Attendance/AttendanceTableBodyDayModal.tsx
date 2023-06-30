import {
  CheckCircleFillSVG,
  CrossCircleFillSVG,
  CrossSVG,
  PersonSVG,
} from "@components/SVG";

import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import { useUserStore } from "@store/user";

const AttendanceTableBodyDayModal: ({
  showModal,
  onClose,
  attendance,
}: {
  showModal: boolean;
  onClose: () => void;
  attendance: Attendance;
}) => JSX.Element = ({ showModal, onClose, attendance }) => {
  const { user } = useUserStore();
  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          <div className="flex justify-end">
            <button onClick={onClose} type="button">
              <CrossSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
            </button>
          </div>
          <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
            Asistencia
          </div>
          <div className="flex">
            <div className="flex w-full select-none gap-4 bg-white p-2 hover:bg-gray-100">
              <h1 className="text-sm font-bold text-dark-500">Nombre</h1>
            </div>
            <div className="flex w-1/3 select-none items-center justify-center gap-4 bg-white p-0 hover:bg-gray-100">
              <h1 className="text-sm font-bold text-dark-500">Asistencia</h1>
            </div>
            <div className="flex w-full items-center  bg-white p-2 hover:bg-gray-100">
              <h1 className="text-sm font-bold text-dark-500">Observaciones</h1>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="flex">
              <div className="flex w-full select-none gap-4 bg-white p-2 hover:bg-gray-100">
                <div className="relative my-auto aspect-square h-8 w-8">
                  {user.photo ? (
                    <Image
                      className="h-8 w-8 rounded-full object-cover"
                      src={getImageURL(user.photo)}
                      alt={user.photo.name}
                      width={320}
                      height={320}
                    />
                  ) : (
                    <PersonSVG className="aspect-square h-8 w-8" />
                  )}
                </div>
                <div className="flex items-center">
                  <div className="text-base font-bold text-dark-500">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </div>
              <div className="flex w-1/3 select-none items-center justify-center gap-4 bg-white p-0 hover:bg-gray-100">
                {attendance.status ? (
                  <CheckCircleFillSVG className="h-8 w-8 text-secondary-500" />
                ) : (
                  <CrossCircleFillSVG className="h-8 w-8 text-secondary-500" />
                )}
              </div>
              <div className="flex w-full items-center  bg-white p-2 hover:bg-gray-100">
                <div className="mb-2 w-full text-dark-500">
                  {attendance.remarks
                    ? attendance.remarks
                    : "Sin observaciones"}
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default AttendanceTableBodyDayModal;
