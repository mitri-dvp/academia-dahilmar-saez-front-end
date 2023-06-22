import type { NextPage } from "next";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import Seo from "@components/Seo";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Button from "@components/Button";

import { DatepickerSVG, PersonSVG } from "@components/SVG";
import { edit, photoUpload, photoDelete } from "@services/user";
import { useUserStore } from "@store/user";
import { attributeToLabel } from "@utils/i18n";
import { getImageURL } from "@utils/media";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import dayjs from "@utils/dayjs";
import type { AxiosError } from "axios";
import axios from "axios";
import { useToastStore } from "@store/toast";
import DateInput from "@components/DateInput";
import { removeFocus } from "@utils/global";

const Profile: NextPage = () => {
  const router = useRouter();

  const { user } = useUserStore();
  const { addToast } = useToastStore();

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);

  const [showCalendarInput, setShowCalendarInput] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      documentID: user.documentID,
      dateOfBirth: dayjs(user.dateOfBirth).toDate(),
      email: user.email,
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        firstName: z
          .string({
            required_error: "Introduzca un nombre",
          })
          .min(0, "Introduzca un nombre")
          .max(50, "Longitud máxima superada"),
        lastName: z
          .string({
            required_error: "Introduzca un apellido",
          })
          .min(0, "Introduzca un nombre")
          .max(50, "Longitud máxima superada"),
        documentID: z.coerce
          .number({
            required_error: "Introduzca una cédula",
            invalid_type_error: "Introduzca una cédula válida",
          })
          .positive("Introduzca una cédula válida")
          .int("Introduzca una cédula válida")
          .min(0, "Introduzca una cédula")
          .max(1000000000000, "Longitud máxima superada"),
        dateOfBirth: z
          .date({
            errorMap: () => ({ message: "Ingrese una fecha válida" }),
          })
          .min(dayjs().subtract(85, "years").toDate(), {
            message: "Muy mayor para continuar",
          })
          .max(dayjs().subtract(3, "years").toDate(), {
            message: "Muy jóven para continuar",
          }),
        email: z
          .string({
            required_error: "Introduzca un email",
          })
          .email("Introduzca un email válido"),
      })
    ),
    onSubmit: async (values) => {
      const editValues = {
        ...values,
        documentID: String(values.documentID),
        dateOfBirth: dayjs(values.dateOfBirth).format("YYYY-MM-DD"),
      };

      try {
        // Action
        await edit(editValues);
        // On Success
        handleSuccess();
      } catch (error) {
        // On Error
        handleError(error);
      }
    },
  });

  const handleSuccess = () => {
    router.push("/dashboard/profile");
    addToast({
      title: "Perfil Editado",
    });
  };

  const handleError = (error: unknown | AxiosError) => {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      if (error.response && error.response.data.error) {
        for (
          let i = 0;
          i < error.response.data.error.details.errors.length;
          i++
        ) {
          const currentError = error.response.data.error.details.errors[i];

          const attribute = currentError.path[0];
          formik.setFieldError(
            attribute,
            `${attributeToLabel(attribute)} ya se encuentra registrado`
          );
        }
      }

      if (error.code === "ERR_NETWORK") {
        formik.setFieldError("role", `Error de conexión`);
      }
    } else {
      formik.setFieldError("role", `Error desconocido`);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          if (target.files && target.files[0]) {
            setIsUploadingPhoto(true);
            photoUpload(target.files[0])
              .then(() => {
                addToast({
                  title: user.photo ? "Foto Actualizada" : "Foto Publicada",
                });
                setIsUploadingPhoto(false);
              })
              .catch(() => {
                setIsUploadingPhoto(false);
              });
          }
        }
      };
      fileReader.readAsDataURL(target.files[0]);
    }
  };

  const handlePhotoDelete = () => {
    setIsDeletingPhoto(true);
    photoDelete()
      .then(() => {
        addToast({
          title: "Foto Eliminada",
        });
        setIsDeletingPhoto(false);
      })
      .catch(() => {
        setIsDeletingPhoto(false);
      });
  };

  return (
    <DashboardLayout>
      <Seo
        title="Editar Perfil | Academia Dahilmar Sáez"
        description="Editar Perfil | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="flex w-max gap-16 bg-white p-16 shadow-lg">
          <div className="min-h-80 relative my-auto aspect-square w-80">
            {user.photo ? (
              <Image
                className="h-80 w-80 rounded-full object-cover"
                src={getImageURL(user.photo)}
                alt={user.photo.name}
                width={320}
                height={320}
              />
            ) : (
              <PersonSVG className="aspect-square h-80 w-80" />
            )}
            <div className="mt-8 flex w-full gap-4">
              {user.photo ? (
                <div className="w-1/2" onClick={handlePhotoDelete}>
                  <Button
                    styles="w-full"
                    color="clear"
                    loading={isDeletingPhoto}
                    type="button"
                  >
                    Borrar
                  </Button>
                </div>
              ) : null}
              <Button
                styles={`relative ${user.photo ? "w-1/2" : "w-full"}`}
                type="button"
                loading={isUploadingPhoto}
              >
                {user.photo ? "Cambiar" : "Subir Foto"}
                <label className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-transparent">
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    accept="image/*"
                    hidden
                  />
                </label>
              </Button>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="w-96 space-y-8">
            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="relative z-0">
                  <input
                    type="text"
                    id="firstName"
                    className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                    placeholder=" "
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    htmlFor="firstName"
                    className="peer-focus:dark:text-sering-secondary-300 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                  >
                    Nombre
                  </label>
                </div>
                <p className="mt-2 text-xs text-red-500">
                  {formik.touched.firstName && Boolean(formik.errors.firstName)
                    ? formik.errors.firstName
                    : "\xA0"}
                </p>
              </div>

              <div className="w-1/2">
                <div className="relative z-0">
                  <input
                    type="text"
                    id="lastName"
                    className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                    placeholder=" "
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    htmlFor="lastName"
                    className="peer-focus:dark:text-sering-secondary-300 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                  >
                    Apellido
                  </label>
                </div>
                <p className="mt-2 text-xs text-red-500">
                  {formik.touched.lastName && Boolean(formik.errors.lastName)
                    ? formik.errors.lastName
                    : "\xA0"}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="relative z-0">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]+"
                    id="documentID"
                    className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                    placeholder=" "
                    value={formik.values.documentID}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    htmlFor="documentID"
                    className="peer-focus:dark:text-sering-secondary-300 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                  >
                    Cédula
                  </label>
                </div>
                <p className="mt-2 text-xs text-red-500">
                  {formik.touched.documentID &&
                  Boolean(formik.errors.documentID)
                    ? formik.errors.documentID
                    : "\xA0"}
                </p>
              </div>

              <div className="w-1/2">
                <div className="relative">
                  <div className="relative z-0">
                    <input
                      ref={dateRef}
                      id="dateOfBirth"
                      type="text"
                      className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 capitalize text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                      placeholder=" "
                      defaultValue={dayjs(formik.values.dateOfBirth).format(
                        "DD/MM/YYYY"
                      )}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          return formik.setFieldValue("dateOfBirth", undefined);
                        }
                        formik.setFieldValue(
                          "dateOfBirth",
                          dayjs(e.target.value, "DD/MM/YYYY").toDate()
                        );
                      }}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        setShowCalendarInput(false);
                      }}
                      onFocus={() => {
                        setShowCalendarInput(true);
                      }}
                    />
                    <label
                      htmlFor="dateOfBirth"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                    >
                      Fecha de Nacimiento
                    </label>
                    <label
                      htmlFor="dateOfBirth"
                      className="peer-focus:text-secondary-500"
                    >
                      <DatepickerSVG className="absolute bottom-2 right-0 h-5 w-5" />
                    </label>
                  </div>

                  <div onMouseDown={(e) => e.preventDefault()}>
                    {showCalendarInput ? (
                      <DateInput
                        selectedDate={dayjs(formik.values.dateOfBirth).toDate()}
                        onChange={(date: Date) => {
                          removeFocus();
                          formik.setFieldValue("dateOfBirth", date);
                          if (dateRef.current) {
                            dateRef.current.value =
                              dayjs(date).format("DD/MM/YYYY");
                          }
                        }}
                        onClear={() => {
                          formik.setFieldValue("dateOfBirth", undefined);
                          if (dateRef.current) {
                            dateRef.current.value = "";
                          }
                        }}
                      />
                    ) : null}
                  </div>
                </div>
                <p className="mt-2 text-xs text-red-500">
                  {formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth)
                    ? String(formik.errors.dateOfBirth)
                    : "\xA0"}
                </p>
              </div>
            </div>

            <div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="email"
                  className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
                  placeholder=" "
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="email"
                  className="peer-focus:dark:text-sering-secondary-300 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
                >
                  Email
                </label>
              </div>
              <p className="mt-2 text-xs text-red-500">
                {formik.touched.email && Boolean(formik.errors.email)
                  ? formik.errors.email
                  : "\xA0"}
              </p>
            </div>

            <div className="flex gap-4">
              <Link href={"/dashboard/profile"} className="w-1/2">
                <Button styles="w-full" color="clear" type="button">
                  Cancelar
                </Button>
              </Link>
              <Button
                styles="w-1/2"
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
              >
                Actualizar
              </Button>
            </div>
          </form>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Profile;
