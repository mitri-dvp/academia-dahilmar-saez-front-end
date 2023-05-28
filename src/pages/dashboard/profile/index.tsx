import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import Seo from "@components/Seo";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Button from "@components/Button";
import { PersonSVG } from "@components/SVG";

import { useUserStore } from "@store/user";

import { getImageURL } from "@utils/media";

const Profile: NextPage = () => {
  const { user } = useUserStore();

  return (
    <DashboardLayout>
      <Seo
        title="Perfil | Academia Dahilmar Sáez"
        description="Perfil | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="flex w-max gap-16 bg-white   p-16 shadow-lg">
          <div className="relative my-auto aspect-square h-80 w-80">
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
          </div>
          <div className="w-96 space-y-8">
            <div className="flex gap-4">
              <div className="w-1/2">
                <h1 className="text-sm font-bold text-dark-500">Nombre</h1>
                <div className="mb-2 w-full text-dark-500">
                  {user.firstName}
                </div>
              </div>

              <div className="w-1/2">
                <h1 className="text-sm font-bold text-dark-500">Apellido</h1>
                <div className="mb-2 w-full text-dark-500">{user.lastName}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <h1 className="text-sm font-bold text-dark-500">Cédula</h1>
                <div className="mb-2 w-full text-dark-500">
                  {user.documentID}
                </div>
              </div>
              <div className="w-1/2">
                <h1 className="text-sm font-bold text-dark-500">
                  Fecha de Nacimiento
                </h1>
                <div className="mb-2 w-full text-dark-500">
                  {user.dateOfBirth}
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-sm font-bold text-dark-500">Email</h1>
              <Link
                href={`mailto:${user.email}`}
                className="mb-2 w-full text-secondary-700 hover:underline"
              >
                {user.email}
              </Link>
            </div>

            <Link
              href={"/dashboard/profile/edit"}
              className="mr-auto block w-max pt-4"
            >
              <Button>Editar Perfil</Button>
            </Link>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Profile;
