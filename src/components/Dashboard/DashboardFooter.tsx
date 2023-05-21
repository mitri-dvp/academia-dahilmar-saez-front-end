import type { FC } from "react";

const DashboardFooter: FC = () => {
  return (
    <footer className="relative mx-auto w-full bg-dark-500 px-8 py-8 text-white">
      <div className="mx-auto max-w-screen-xl px-0 md:px-8">
        <p className="mt-2 text-center text-sm text-gray-300">
          ©{new Date().getFullYear()} Academia Dahilmar Sáez. Todos los Derechos
          Reservados.
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
