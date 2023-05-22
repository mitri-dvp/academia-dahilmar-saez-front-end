import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import Button from "@components/Button";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import type { AxiosError } from "axios";
import axios from "axios";
import { login } from "@services/auth";

const Login: NextPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
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
      })
    ),
    onSubmit: async (values) => {
      try {
        // Action
        await login(values);
        // On Success
        handleSuccess();
      } catch (error) {
        // On Error
        handleError(error);
      }
    },
  });

  const handleSuccess = () => {
    router.push("/dashboard");
  };

  const handleError = (error: unknown | AxiosError) => {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      if (error.response && error.response.data.error) {
        formik.setFieldError("password", error.response.data.error.message);
      }

      if (error.code === "ERR_NETWORK") {
        formik.setFieldError("role", `Error de conexión`);
      }
    } else {
      formik.setFieldError("role", `Error desconocido`);
    }
  };

  return (
    <Layout>
      <Seo
        title="Login | Academia Dahilmar Sáez"
        description="Login | Academia Dahilmar Sáez"
      />

      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto mt-40 w-full max-w-sm space-y-8 px-4"
      >
        <h1 className="text-lg font-bold">Ingresa a tu cuenta</h1>

        <div>
          <div className="relative z-0">
            <input
              type="text"
              id="email"
              className="peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500 peer-focus:dark:text-blue-500"
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
              className="peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-dark-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-500 dark:text-dark-500 peer-focus:dark:text-blue-500"
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

        <Button
          className="w-full"
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
        >
          Iniciar sesión
        </Button>

        <hr className="border-dark-500" />

        <div className="mt-8 space-x-2 text-sm">
          <span>¿No tienes una cuenta?</span>
          <Link
            href="/signup"
            className="border-b-1 border border-transparent text-secondary-500 hover:border-b-secondary-500"
          >
            Regístrate
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
