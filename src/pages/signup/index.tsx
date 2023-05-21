import type { NextPage } from "next";
import Link from "next/link";

import Seo from "@components/Seo";
import Layout from "@components/Layout";
import Button from "@components/Button";
import { DatepickerSVG } from "@components/SVG";
import { USER_ROLES } from "@utils/global";
import { signup } from "@services/auth";

import { z } from "zod";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";

const validationSchema = toFormikValidationSchema(
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
    password: z
      .string({
        required_error: "Introduzca una contraseña",
      })
      .min(8, "La contraseña debe contener al menos 8 caracteres"),
    role: z.string({
      required_error: "Seleccione un tipo de usuario",
    }),
  })
);

const Signup: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      documentID: "",
      dateOfBirth: {
        startDate: null,
        endDate: null,
      },
      email: "",
      password: "",
      role: USER_ROLES.ATHLETE,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const userValues = {
        ...values,
        dateOfBirth: dayjs(values.dateOfBirth.startDate).format("YYYY-MM-DD"),
      };

      signup(userValues);
    },
  });

  return (
    <Layout>
      <Seo
        title="Signup | Academia Dahilmar Sáez"
        description="Signup | Academia Dahilmar Sáez"
      />

      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto mt-40 w-full max-w-sm space-y-8 px-4 py-8"
      >
        <h1 className="text-lg font-bold">Crea tu cuenta</h1>

        <div className="flex cursor-pointer gap-4">
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

        <div>
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
            {formik.touched.documentID && Boolean(formik.errors.documentID)
              ? formik.errors.documentID
              : "\xA0"}
          </p>
        </div>

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
            useRange={false}
            toggleIcon={() => <DatepickerSVG className="h-5 w-5" />}
            displayFormat="DD/MM/YYYY"
            placeholder=" "
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
            {formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              ? formik.errors.dateOfBirth?.startDate
              : "\xA0"}
          </p>
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

        <div>
          <div className="relative z-0">
            <input
              type="password"
              id="password"
              className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="peer-focus:dark:text-sering-secondary-300 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
            >
              Contraseña
            </label>
          </div>

          <p className="mt-2 text-xs text-red-500">
            {formik.touched.password && Boolean(formik.errors.password)
              ? formik.errors.password
              : "\xA0"}
          </p>
        </div>

        <h1 className="text-lg font-bold">Seleccione el tipo de usuario</h1>
        <div className="space-y-2">
          <div
            className={`flex items-center border border-dark-500 pl-4 transition hover:border-secondary-500 dark:border-dark-500 ${
              formik.values.role === USER_ROLES.ATHLETE
                ? "border-secondary-500"
                : ""
            }`}
          >
            <input
              defaultChecked
              id={`role-${USER_ROLES.ATHLETE}`}
              type="radio"
              value={USER_ROLES.ATHLETE}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="role"
              className="dark:bg-darkborder-dark-500 dark:focus:ring-setext-secondary-500 peer h-4 w-4 cursor-pointer border-dark-500  bg-gray-100 text-secondary-500  focus:ring-2 focus:ring-secondary-300 dark:border-dark-500 dark:ring-offset-gray-800"
            />
            <label
              htmlFor={`role-${USER_ROLES.ATHLETE}`}
              className="peer ml-2 w-full cursor-pointer py-4 text-sm font-medium text-gray-900   dark:text-dark-500"
            >
              Atleta
            </label>
          </div>

          <div
            className={`flex items-center border border-dark-500 pl-4 transition hover:border-secondary-500 dark:border-dark-500 ${
              formik.values.role === USER_ROLES.GUARDIAN
                ? "border-secondary-500"
                : ""
            }`}
          >
            <input
              id={`role-${USER_ROLES.GUARDIAN}`}
              type="radio"
              value={USER_ROLES.GUARDIAN}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="role"
              className="dark:bg-darkborder-dark-500 dark:focus:ring-setext-secondary-500 h-4 w-4 cursor-pointer border-dark-500 bg-gray-100 text-secondary-500 focus:ring-2 focus:ring-secondary-300 dark:border-dark-500 dark:ring-offset-gray-800"
            />
            <label
              htmlFor={`role-${USER_ROLES.GUARDIAN}`}
              className="ml-2 w-full cursor-pointer py-4  text-sm font-medium text-gray-900 dark:text-dark-500"
            >
              Representante
            </label>
          </div>

          <div
            className={`flex items-center border border-dark-500 pl-4 transition hover:border-secondary-500 dark:border-dark-500 ${
              formik.values.role === USER_ROLES.TRAINER
                ? "border-secondary-500"
                : ""
            }`}
          >
            <input
              id={`role-${USER_ROLES.TRAINER}`}
              type="radio"
              value={USER_ROLES.TRAINER}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="role"
              className="dark:bg-darkborder-dark-500 dark:focus:ring-setext-secondary-500 h-4 w-4 cursor-pointer border-dark-500 bg-gray-100 text-secondary-500 focus:ring-2 focus:ring-secondary-300 dark:border-dark-500 dark:ring-offset-gray-800"
            />
            <label
              htmlFor={`role-${USER_ROLES.TRAINER}`}
              className="ml-2 w-full cursor-pointer py-4  text-sm font-medium text-gray-900 dark:text-dark-500"
            >
              Entrenador
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            {formik.touched.role && Boolean(formik.errors.role)
              ? formik.errors.role
              : "\xA0"}
          </p>
        </div>

        <Button className="w-full">Crear cuenta</Button>

        <hr className="border-dark-500" />

        <div className="mt-8 space-x-2 text-sm">
          <span>¿Ya tienes una cuenta?</span>
          <Link
            href="/login"
            className="border-b-1 border border-transparent text-secondary-500 hover:border-b-secondary-500"
          >
            Iniciar sesión
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default Signup;
