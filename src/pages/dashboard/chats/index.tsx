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
import ChatContactModal from "@components/Chat/ChatContactModal";
import { useUserStore } from "@store/user";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import ChatList from "@components/Chat/ChatList";
import ChatView from "@components/Chat/ChatView";
import ChatViewEmpty from "@components/Chat/ChatViewEmpty";

const Chats: NextPage = () => {
  const { chats } = useChatStore();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chat, setChat] = useState<Chat>();

  useEffect(() => {
    setIsLoading(true);
    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const handleChatSelect = async (chat: Chat) => {
    setChat(chat);
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
                    <div className="mx-auto mt-16 mb-16 w-56 px-8 text-center font-display text-2xl font-semibold uppercase">
                      Chats no encontrados
                    </div>
                  )}
                </div>
                <div
                  className="mt-auto flex cursor-pointer items-center justify-center gap-4 bg-secondary-500 py-6 px-8 text-center font-display text-2xl font-semibold uppercase text-white transition-all hover:bg-secondary-700"
                  onClick={() => setShowModal(true)}
                >
                  <PlusCircleDottedSVG className="h-8 w-8" />
                  Nuevo Chat
                </div>
              </>
            )}
          </div>
          {chat ? <ChatView chat={chat} /> : <ChatViewEmpty />}
        </div>
        {showModal ? (
          <ChatContactModal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            onSelect={handleChatSelect}
          />
        ) : null}
      </section>
    </DashboardLayout>
  );
};

export default Chats;
