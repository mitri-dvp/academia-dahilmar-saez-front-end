import { useEffect, useState } from "react";
import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";

import React from "react";
import { CrossSVG, PersonSVG } from "../SVG";
import { getAthletes } from "@services/user";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import { create } from "@services/group";
import { useUserStore } from "@store/user";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@components/Button";
import Link from "next/link";

const GroupAddModal: ({
  showModal,
  onClose,
  group,
}: {
  showModal: boolean;
  onClose: () => void;
  group: Group;
}) => JSX.Element = ({ showModal, onClose, group }) => {
  const userStore = useUserStore();

  const users: User[] = [];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      users: users,
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({
          required_error: "Introduzca un nombre",
        }),
        description: z.string({
          required_error: "Introduzca una descripción",
        }),
        users: z.array(z.any()).nonempty(),
      })
    ),
    onSubmit: async (values) => {
      const createValues = {
        name: values.name,
        description: values.description,
        users: [...values.users.map((user) => user.id), userStore.user.id],
      };
      try {
        // Action
        await create(createValues);
        // On Success
        // handleSuccess();
        onClose();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  const [athletes, setAthletes] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);

    getAthletes()
      .then((athletes) => {
        setAthletes(athletes);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleSelectAthlete = (athlete: User, isSelected: boolean) => {
    if (isSelected) {
      formik.setFieldValue(
        "users",
        formik.values.users.filter((user) => user.id !== athlete.id)
      );
    }

    if (!isSelected) {
      formik.setFieldValue("users", [...formik.values.users, athlete]);
    }
  };

  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          <div className="flex justify-end">
            <button onClick={onClose} type="button">
              <CrossSVG className="h-6 w-6 stroke-gray-900" />
            </button>
          </div>
          <div>
            <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
              {group.name}
            </div>
            <div className="mx-auto w-96 space-y-8">
              <div className="text-base">{group.description}</div>
              <div className="text-base font-semibold">Integrantes</div>
              <div className="flex flex-wrap gap-2">
                {group.users.map((user) => {
                  if (user.id === userStore.user.id) return null;
                  return (
                    <div
                      key={user.id}
                      className="flex w-max select-none gap-3 rounded-full border border-secondary-500 bg-white p-4 py-3 transition-all animate-duration-200 animate-ease-in-out"
                    >
                      <div className="relative my-auto aspect-square h-12 w-12">
                        {user.photo ? (
                          <Image
                            className="h-12 w-12 rounded-full object-cover"
                            src={getImageURL(user.photo)}
                            alt={user.photo.name}
                            width={320}
                            height={320}
                          />
                        ) : (
                          <PersonSVG className="aspect-square h-12 w-12" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-base font-bold text-dark-500">
                          {user.firstName} {user.lastName}
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <Link className="block" href="/dashboard/schedule/trainer">
                  <Button styles="w-full">Ir A Horarios</Button>
                </Link>
                <Link className="block" href="/dashboard/attendance/trainer">
                  <Button styles="w-full">Ir A Asistencias</Button>
                </Link>
              </div>
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default GroupAddModal;