import { useEffect, useState } from "react";
import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
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
import { useToastStore } from "@store/toast";

const ChatContactModal: ({
  showModal,
  onClose,
  onSelect,
}: {
  showModal: boolean;
  onClose: () => void;
  onSelect: (chat: Chat) => void;
}) => JSX.Element = ({ showModal, onClose, onSelect }) => {
  const userStore = useUserStore();
  const { groups } = useGroupStore();
  const { chats } = useChatStore();
  const { addToast } = useToastStore();

  const [contacts, setContacts] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

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

        // Duplicate Handling
        if (
          contactList.find((contactUser) => contactUser.id === groupUser.id)
        ) {
          continue;
        }

        // Athlete handling
        if (userStore.user.role.type === USER_ROLES.ATHLETE) {
          if (groupUser.role.type === USER_ROLES.TRAINER) {
            contactList.push(groupUser);
          }
        }

        // Tariner handling
        if (userStore.user.role.type === USER_ROLES.TRAINER) {
          if (groupUser.id !== userStore.user.id) contactList.push(groupUser);
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
      .then((chat) => {
        addToast({
          title: "Chat Creado",
        });
        setIsLoading(false);
        onClose();
        onSelect(chat);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Root open={showModal} onOpenChange={onClose}>
      <Portal>
        <Overlay className="modal-overlay" />
        <Content className="modal-content w-full max-w-xl">
          <div className="flex justify-end">
            <button onClick={onClose} type="button">
              <CrossSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
            </button>
          </div>
          <div>
            <div className="mb-6 text-center font-display text-lg font-semibold uppercase md:text-2xl">
              Selecciona Contacto
            </div>
            <div className="max-h-[36rem] overflow-y-auto">
              {contacts.length === 0 ? (
                <div className="mx-auto my-16 w-56 px-8 text-center font-display text-xs font-semibold uppercase text-dark-500 md:text-base">
                  Contactos no encontrados
                </div>
              ) : null}
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex w-full cursor-pointer select-none gap-4 bg-white p-4 transition-all hover:bg-gray-100 md:gap-8 md:p-8"
                  onClick={() => handleSelectContact(contact)}
                >
                  <div className="relative my-auto aspect-square h-10 w-10 md:h-16 md:w-16">
                    {contact.photo ? (
                      <Image
                        className="h-10 w-10 rounded-full object-cover md:h-16 md:w-16"
                        src={getImageURL(contact.photo)}
                        alt={contact.photo.name}
                        width={320}
                        height={320}
                      />
                    ) : (
                      <PersonSVG className="aspect-square h-10 w-10 md:h-16 md:w-16" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-base font-bold text-dark-500 md:text-xl">
                      {contact.firstName} {contact.lastName}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default ChatContactModal;
