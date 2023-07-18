import Button from "@components/Button";
import { PersonSVG, SpinnerSVG } from "@components/SVG";
import { get } from "@services/chat";
import { useChatStore } from "@store/chat";
import { useUserStore } from "@store/user";
import { getImageURL } from "@utils/media";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardChatSummary = () => {
  const { chats } = useChatStore();
  const { user } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const chatsSummary = chats.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 border p-6 md:h-72">
      <header className="flex items-center">
        <h1 className="font-display text-lg font-semibold uppercase md:text-2xl">
          Mensajes
        </h1>
        <Link
          href={"/dashboard/chats"}
          className="ml-auto text-xs md:text-base"
        >
          <Button styles="px-2 md:px-8">Ver Mensajes</Button>
        </Link>
      </header>
      <div className="flex h-full gap-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
          </div>
        ) : (
          <>
            {chatsSummary.length ? (
              <div className="w-full">
                {chatsSummary.map((chat) => {
                  const contact = chat.users.find(
                    (contact) => contact.id !== user.id
                  );
                  if (!contact) return null;
                  return (
                    <div
                      key={contact.id}
                      className="flex w-full select-none gap-4 bg-white p-4 transition-all hover:bg-gray-100"
                    >
                      <div className="relative my-auto aspect-square h-12 w-12">
                        {contact.photo ? (
                          <Image
                            className="h-12 w-12 rounded-full object-cover"
                            src={getImageURL(contact.photo)}
                            alt={contact.photo.name}
                            width={320}
                            height={320}
                          />
                        ) : (
                          <PersonSVG className="aspect-square h-12 w-12" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <h1 className="break-words text-lg font-bold text-dark-500 line-clamp-2">
                          {contact.firstName} {contact.lastName}
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex w-full items-center justify-center rounded-md border px-2 py-5 text-center font-display text-lg font-semibold uppercase md:text-2xl">
                Chats no encontrados
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardChatSummary;
