import { useEffect, useState } from "react";
import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import React from "react";
import { CheckCircleSVG, CrossSVG, PencilSquareSVG, PersonSVG } from "../SVG";
import { getAthletes } from "@services/user";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import { edit } from "@services/group";
import { useUserStore } from "@store/user";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@components/Button";

const GroupModalEditContent: ({
  group,
  onClose,
  toggleEditing,
}: {
  group: Group;
  onClose: () => void;
  toggleEditing: () => void;
}) => JSX.Element = ({ group, onClose, toggleEditing }) => {
  const userStore = useUserStore();

  const users: User[] = group.users.filter(
    (user) => user.id !== userStore.user.id
  );

  const formik = useFormik({
    initialValues: {
      name: group.name,
      description: group.description,
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
      const data = {
        name: values.name,
        description: values.description,
        users: [...values.users.map((user) => user.id), userStore.user.id],
      };

      try {
        // Action
        await edit(group.id, data);
        // On Success
        // handleSuccess();
        toggleEditing();
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
    <React.Fragment>
      <div className="flex justify-end gap-4">
        <button onClick={toggleEditing} type="button">
          <PencilSquareSVG className="h-6 w-6 stroke-dark-500" />
        </button>
        <button onClick={onClose} type="button">
          <CrossSVG className="h-6 w-6 stroke-dark-500" />
        </button>
      </div>
      <div>
        <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
          Editar {group.name}
        </div>
        <form onSubmit={formik.handleSubmit} className="mx-auto w-96 space-y-8">
          <div className="text-base font-semibold">
            Introduzca la Información
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="w-full">
              <div className="relative z-0">
                <input
                  type="text"
                  id="name"
                  className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                  placeholder=" "
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                >
                  Nombre
                </label>
              </div>
              <p className="mt-2 text-xs text-red-500">
                {formik.touched.name && Boolean(formik.errors.name)
                  ? formik.errors.name
                  : "\xA0"}
              </p>
            </div>

            <div className="w-full">
              <div className="relative z-0">
                <textarea
                  id="description"
                  className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-4 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                  placeholder=" "
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={3}
                />
                <label
                  htmlFor="description"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                >
                  Descripción
                </label>
              </div>
              <p className="mt-2 text-xs text-red-500">
                {formik.touched.description &&
                Boolean(formik.errors.description)
                  ? formik.errors.description
                  : "\xA0"}
              </p>
            </div>
          </div>

          <div className="text-base font-semibold">
            Selecciona los Integrantes
          </div>

          <div className="relative z-0">
            <input
              type="text"
              id="users"
              className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
              placeholder="Buscar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="max-h-72 overflow-y-auto">
            {athletes
              .filter((athlete) =>
                Boolean(
                  `${athlete.firstName} ${athlete.lastName}`.includes(query)
                )
              )
              .map((athlete) => {
                const isSelected = Boolean(
                  formik.values.users.find((user) => user.id === athlete.id)
                );

                return (
                  <div
                    key={athlete.id}
                    className="flex w-full cursor-pointer select-none gap-4 bg-white p-3 transition-all hover:bg-gray-100"
                    onClick={() => handleSelectAthlete(athlete, isSelected)}
                  >
                    <div className="relative my-auto aspect-square h-12 w-12">
                      {athlete.photo ? (
                        <Image
                          className="h-12 w-12 rounded-full object-cover"
                          src={getImageURL(athlete.photo)}
                          alt={athlete.photo.name}
                          width={48}
                          height={48}
                        />
                      ) : (
                        <PersonSVG className="aspect-square h-12 w-12" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <h1 className="text-base font-bold text-dark-500">
                        {athlete.firstName} {athlete.lastName}
                      </h1>
                    </div>
                    {isSelected ? (
                      <div className="ml-auto flex items-center">
                        <CheckCircleSVG className="h-8 w-8 text-secondary-500" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>

          <div className="flex flex-wrap gap-2">
            {formik.values.users.map((user) => (
              <div
                key={user.id}
                className="flex w-max animate-jump-in select-none gap-2 rounded-full border border-secondary-500 bg-white p-2 transition-all animate-duration-200 animate-ease-in-out"
              >
                <div className="relative my-auto aspect-square h-4 w-4">
                  {user.photo ? (
                    <Image
                      className="h-4 w-4 rounded-full object-cover"
                      src={getImageURL(user.photo)}
                      alt={user.photo.name}
                      width={16}
                      height={16}
                    />
                  ) : (
                    <PersonSVG className="aspect-square h-4 w-4" />
                  )}
                </div>
                <div className="flex items-center">
                  <h1 className="text-xs font-bold text-dark-500">
                    {user.firstName} {user.lastName}
                  </h1>
                </div>
              </div>
            ))}
            <p className="text-xs text-red-500">
              {formik.touched.users && Boolean(formik.errors.users)
                ? "Seleccione un usuario"
                : "\xA0"}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              styles="w-1/2"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Actualizar Grupo
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default GroupModalEditContent;
