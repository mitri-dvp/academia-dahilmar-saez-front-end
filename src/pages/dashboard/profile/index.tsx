import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

const Profile: NextPage = () => {
  return (
    <DashboardLayout>
      <Seo
        title="Perfil | Academia Dahilmar Sáez"
        description="Perfil | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full md:py-14 md:px-10">
        Profile
      </section>
    </DashboardLayout>
  );
};

export default Profile;
