import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import React from "react";
import { CrossSVG, PersonSVG } from "../SVG";
import { useGroupStore } from "@store/group";
import { get } from "@services/group";
import { USER_ROLES } from "@utils/global";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import { create } from "@services/chat";
import { useUserStore } from "@store/user";
import { useChatStore } from "@store/chat";

const ChatContactModal: ({
  showModal,
  onClose,
  onSelect,
}: {
  showModal: boolean;
  onClose: () => void;
  onSelect: (chat: Chat) => void;
}) => JSX.Element = ({ showModal, onClose, onSelect }) => {
  const { groups } = useGroupStore();
  const { user } = useUserStore();
  const { chats } = useChatStore();

  const [contacts, setContacts] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const contactList: User[] = [];

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];

      if (!group) break;

      for (let j = 0; j < group.users.length; j++) {
        const groupUser = group.users[j];

        if (!groupUser) break;

        // Athlete handling
        if (user.role.type === USER_ROLES.ATHLETE) {
          if (groupUser.role.type === USER_ROLES.TRAINER)
            contactList.push(groupUser);
        }

        // Tariner handling
        if (user.role.type === USER_ROLES.TRAINER) {
          if (groupUser.id !== user.id) contactList.push(groupUser);
        }
      }
    }
    setContacts(contactList);
  }, [groups]);

  const handleSelectContact = async (contact: User) => {
    const chat = chats.find((chat) =>
      chat.users.find((user) => user.id === contact.id)
    );
    if (chat) {
      onSelect(chat);
      onClose();
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    // Create Chat
    create(contact)
      .then(() => {
        setIsLoading(false);
        onClose();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      show={showModal}
      onClose={onClose}
      dismissible={true}
      className="animate-fade animate-duration-200 animate-ease-out"
      position="top-center"
    >
      <Modal.Body>
        <div className="flex justify-end">
          <button onClick={onClose} type="button">
            <CrossSVG className="h-6 w-6 stroke-gray-900" />
          </button>
        </div>
        <div className="py-6">
          <div className="mb-6 text-center font-display text-2xl font-semibold uppercase">
            Selecciona Contacto
          </div>
          <div className="max-h-[36rem] overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex w-full cursor-pointer select-none gap-8 bg-white p-8 transition-all hover:bg-gray-100"
                onClick={() => handleSelectContact(contact)}
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
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChatContactModal;
