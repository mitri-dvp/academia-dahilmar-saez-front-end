import type { NextPage } from "next";
import { useState } from "react";
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
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import type { AxiosError } from "axios";
import axios from "axios";

const Profile: NextPage = () => {
  const router = useRouter();

  const { user } = useUserStore();

  // TO-DO
  // CREAR COMPONENTE DE EDICION DE FOTO DE PERFIL EN PROD
  // const [photoPreview, setPhotoPreview] = useState("");
  // const [photo, setPhoto] = useState<File | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      documentID: user.documentID,
      dateOfBirth: {
        startDate: user.dateOfBirth,
        endDate: user.dateOfBirth,
      },
      email: user.email,
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        firstName: z.string({
          required_error: "Introduzca un nombre",
        }),
        lastName: z.string({
          required_error: "Introduzca un apellido",
        }),
        documentID: z.coerce
          .number({
            required_error: "Introduzca una cédula",
            invalid_type_error: "Introduzca una cédula válida",
          })
          .positive("Introduzca una cédula válida")
          .int("Introduzca una cédula válida"),
        dateOfBirth: z.object({
          startDate: z
            .string({
              required_error: "Introduzca una fecha",
              invalid_type_error: "Introduzca una fecha válida",
            })
            .regex(
              /(\d{1,4}(\/|-)\d{1,2}(\/|-)\d{1,2})/gm,
              "Introduzca una fecha válida"
            ),
          endDate: z
            .string({
              required_error: "Introduzca una fecha",
              invalid_type_error: "Introduzca una fecha válida",
            })
            .regex(
              /(\d{1,4}(\/|-)\d{1,2}(\/|-)\d{1,2})/gm,
              "Introduzca una fecha válida"
            ),
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
        dateOfBirth: dayjs(values.dateOfBirth.startDate).format("YYYY-MM-DD"),
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
              .then((value) => {
                setIsUploadingPhoto(false);
              })
              .catch((error) => {
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
      .then((value) => {
        setIsDeletingPhoto(false);
      })
      .catch((error) => {
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
                <div className="z-1 group relative" tabIndex={-1}>
                  <Datepicker
                    primaryColor={"orange"}
                    containerClassName="group"
                    toggleClassName="text-dark-500 pr-0"
                    inputClassName="text-base font-normal text-dark-500 group rounded-none outline-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 pl-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white dark:focus:border-sering-secondary-300"
                    inputId="dateOfBirth"
                    inputName="dateOfBirth"
                    value={formik.values.dateOfBirth}
                    onChange={(newDate: DateValueType) => {
                      formik.setFieldValue("dateOfBirth", newDate);
                    }}
                    asSingle={true}
                    maxDate={new Date()}
                    useRange={false}
                    toggleIcon={() => <DatepickerSVG className="h-5 w-5" />}
                    displayFormat="DD/MM/YYYY"
                    placeholder=" "
                    i18n="es"
                    readOnly
                  />
                  <label
                    htmlFor="dateOfBirth"
                    onBlur={formik.handleBlur}
                    className={`group-focus:dark:text-sering-secondary-300 absolute top-3 origin-[0] translate-y-0 transform text-base text-dark-500 duration-300 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:text-secondary-500 group-focus:left-0 group-focus:-translate-y-6 group-focus:scale-75 dark:text-dark-500 ${
                      formik.values.dateOfBirth &&
                      formik.values.dateOfBirth.startDate === null
                        ? "translate-y-0 scale-100"
                        : "-translate-y-6 scale-75"
                    }`}
                  >
                    Fecha de Nacimiento
                  </label>
                  <p className="mt-2 text-xs text-red-500">
                    {formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth)
                      ? formik.errors.dateOfBirth?.startDate
                      : "\xA0"}
                  </p>
                </div>
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
