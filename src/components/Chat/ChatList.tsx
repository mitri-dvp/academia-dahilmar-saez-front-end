import { PersonSVG } from "@components/SVG";
import { useChatStore } from "@store/chat";
import { useUserStore } from "@store/user";
import { getImageURL } from "@utils/media";
import Image from "next/image";
import React from "react";

const ChatList: ({
  onSelect,
}: {
  onSelect: (chat: Chat) => void;
}) => JSX.Element = ({ onSelect }) => {
  const { chats } = useChatStore();
  const { user } = useUserStore();

  const chatElements: JSX.Element[] = [];

  for (let i = 0; i < chats.length; i++) {
    const chat = chats[i];

    if (!chat) break;

    const contact = chat.users.find((contact) => contact.id !== user.id);

    if (!contact) break;

    chatElements.push(
      <div
        key={contact.id}
        className="flex w-full cursor-pointer select-none gap-4 bg-white py-4 pr-4 pl-10 transition-all hover:bg-gray-100"
        onClick={() => onSelect(chat)}
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
  }

  return <>{chatElements}</>;
};

export default ChatList;
