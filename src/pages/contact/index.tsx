import type { NextPage } from "next";
import Image from "next/image";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import Button from "@components/Button";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { sendEmail } from "@services/email";
import type { AxiosError } from "axios";
import { isAxiosError } from "axios";
import { useToastStore } from "@store/toast";
import { useState } from "react";

const Contact: NextPage = () => {
  const { addToast } = useToastStore();

  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({
          required_error: "Introduzca un nombre",
        }),
        email: z
          .string({
            required_error: "Introduzca un email",
          })
          .email("Introduzca un email válido"),
        message: z.string({
          required_error: "Introduzca un mensaje",
        }),
      })
    ),
    onSubmit: async (values) => {
      try {
        // Action
        await sendEmail(values);
        // On Success
        setSuccess(true);
      } catch (error) {
        // On Error
        handleError(error);
      }
    },
  });

  const handleError = (error: unknown | AxiosError) => {
    if (isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        formik.setFieldError("message", `Error de conexión`);
      }
      if (error.code === "ERR_BAD_REQUEST") {
        formik.setFieldError("message", `Error de solicitud`);
      }
    } else {
      formik.setFieldError("message", `Error desconocido`);
    }
  };

  return (
    <Layout>
      <Seo
        title="Contacto | Academia Dahilmar Sáez"
        description="Contacto | Academia Dahilmar Sáez"
      />

      <section className="relative w-full">
        <Image
          src={"/img/hero-bg.jpg"}
          alt="hero-image"
          width={1800}
          height={600}
        />
        <div className="absolute top-1/2 left-0 right-0 mx-auto w-full max-w-screen-xl translate-y-1/2 px-8">
          <h1 className="-translate-y-16 font-display text-6xl font-semibold uppercase text-white">
            Contacto
          </h1>
        </div>
      </section>

      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto w-full max-w-sm space-y-8 py-16 px-8"
      >
        <h1 className="text-lg font-bold">Envíanos un mensaje</h1>

        <div>
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
              className="peer-focus:dark:text-sering-secondary-300 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
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
            <textarea
              id="message"
              className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-4 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
              placeholder=" "
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
            />
            <label
              htmlFor="message"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500"
            >
              Mensaje
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            {formik.touched.message && Boolean(formik.errors.message)
              ? formik.errors.message
              : "\xA0"}
          </p>
        </div>

        <Button
          styles="w-full"
          loading={Boolean(formik.isSubmitting)}
          disabled={Boolean(formik.submitCount || formik.isSubmitting)}
        >
          Enviar
        </Button>

        {success ? (
          <div className="bg-green-100 p-4 text-sm text-green-800">
            <span className="font-medium">Mensaje enviado con éxito.</span> Nos
            pondremos en contacto con usted lo antes posible.
          </div>
        ) : null}
      </form>
    </Layout>
  );
};

export default Contact;
