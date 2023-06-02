import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

import { SpinnerSVG } from "@components/SVG";

const Messages: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DashboardLayout>
      <Seo
        title="Mensajes | Academia Dahilmar Sáez"
        description="Mensajes | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="w-max bg-white p-16 shadow-lg">
          {isLoading ? (
            <div className="w-full bg-white">
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            </div>
          ) : (
            <div>Messages</div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Messages;
