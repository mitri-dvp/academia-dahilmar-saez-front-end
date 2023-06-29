import { useEffect, useState } from "react";
import type { NextPage } from "next";

import DashboardLayout from "@components/Dashboard/DashboardLayout";
import Seo from "@components/Seo";

import { useChatStore } from "@store/chat";
import { get } from "@services/chat";

import { PlusCircleDottedSVG, SpinnerSVG } from "@components/SVG";
import ChatContactModal from "@components/Chat/ChatContactModal";
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

      <section>
        <div className="grid min-h-[calc(100vh-5rem)] grid-cols-10 bg-white shadow-lg">
          <div className="col-span-3 flex flex-col pt-14">
            <h1 className="mb-10 px-10 font-display text-6xl font-semibold uppercase">
              Chats
            </h1>
            {isLoading ? (
              <div className="w-full bg-white">
                <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
              </div>
            ) : (
              <>
                <div>
                  {chats.length ? (
                    <ChatList onSelect={handleChatSelect} />
                  ) : (
                    <div className="mt-16 mb-16 px-10  font-display text-2xl font-semibold uppercase">
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
