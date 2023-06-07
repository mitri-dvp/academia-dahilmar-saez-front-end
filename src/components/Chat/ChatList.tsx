import { PersonSVG } from "@components/SVG";
import { useChatStore } from "@store/chat";
import { useUserStore } from "@store/user";
import { getImageURL } from "@utils/media";
import Image from "next/image";
import React from "react";

const ChatList: ({
  onSelect,
}: {
  onSelect: (contact: User) => void;
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
        className="flex w-full cursor-pointer select-none gap-8 bg-white py-8 px-16 transition-all hover:bg-gray-100"
        onClick={() => onSelect(contact)}
      >
        <div className="relative my-auto aspect-square h-16 w-16">
          {contact.photo ? (
            <Image
              className="h-16 w-16 rounded-full object-cover"
              src={getImageURL(contact.photo)}
              alt={contact.photo.name}
              width={320}
              height={320}
            />
          ) : (
            <PersonSVG className="aspect-square h-16 w-16" />
          )}
        </div>
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-dark-500">
            {contact.firstName} {contact.lastName}
          </h1>
        </div>
      </div>
    );
  }

  return <>{chatElements}</>;
};

export default ChatList;
