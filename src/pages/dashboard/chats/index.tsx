import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

import { useChatStore } from "@store/chat";
import { get } from "@services/chat";

import {
  CrossSVG,
  PersonSVG,
  PlusCircleDottedSVG,
  SpinnerSVG,
} from "@components/SVG";
import { Modal } from "flowbite-react";
import ChatContactModal from "@components/Chat/ChatContactModal";
import { useUserStore } from "@store/user";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import ChatList from "@components/Chat/ChatList";
import ChatView from "@components/Chat/ChatView";

const Chats: NextPage = () => {
  const { chats } = useChatStore();
  const { user } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState<User>();

  useEffect(() => {
    setIsLoading(true);
    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const renderChat = () => {
    if (!contact) return;

    return (
      <div className="flex w-full flex-1 flex-col bg-gray-50">
        <div
          className="flex w-full cursor-pointer select-none gap-4 p-4 transition-all hover:bg-gray-100"
          // onClick={() => handleChatSelect(contact)}
        >
          <div className="relative my-auto aspect-square h-10 w-10">
            {contact.photo ? (
              <Image
                className="h-10 w-10 rounded-full object-cover"
                src={getImageURL(contact.photo)}
                alt={contact.photo.name}
                width={320}
                height={320}
              />
            ) : (
              <PersonSVG className="aspect-square h-10 w-10" />
            )}
          </div>
          <div className="flex items-center">
            <h1 className="text-base font-bold text-dark-500">
              {contact.firstName} {contact.lastName}
            </h1>
          </div>
        </div>
        <div className="flex-1 bg-white">Body</div>
        <div className="flex w-full gap-4 p-4">
          <div
            contentEditable
            className="w-full bg-white p-4 outline-none focus:outline-secondary-500"
          >
            <div className="cursor-text select-none">Escribe un mensaje</div>
          </div>
        </div>
      </div>
    );
  };

  const handleChatSelect = (contact: User) => {
    setContact(contact);
  };

  return (
    <DashboardLayout>
      <Seo
        title="Mensajes | Academia Dahilmar Sáez"
        description="Mensajes | Academia Dahilmar Sáez"
      />

      <section className="min-h-screen w-full bg-gray-50 md:py-14 md:px-10">
        <div className="flex min-h-[calc(100vh-12rem)] bg-white shadow-lg">
          <div className="flex flex-col p-0">
            <h1 className="p-16 pb-0 font-display text-6xl font-semibold uppercase">
              Chats
            </h1>
            {isLoading ? (
              <div className="w-full bg-white">
                <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
              </div>
            ) : (
              <>
                <div className="mt-8 space-y-8">
                  {chats.length ? (
                    <ChatList onSelect={handleChatSelect} />
                  ) : (
                    <div className="mt-16 mb-16 px-8 text-center font-display text-2xl font-semibold uppercase">
                      Chats no encontrados
                    </div>
                  )}
                </div>
                <div
                  className="mt-auto flex cursor-pointer items-center justify-center gap-4 bg-secondary-500 py-6 px-8 text-center font-display text-2xl font-semibold uppercase text-white transition-all hover:bg-secondary-700"
                  onClick={() => setShowModal(!showModal)}
                >
                  <PlusCircleDottedSVG className="h-8 w-8" />
                  Nuevo Chat
                </div>
              </>
            )}
          </div>
          {contact ? <ChatView contact={contact} /> : null}
        </div>
        <ChatContactModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      </section>
    </DashboardLayout>
  );
};

export default Chats;
