import { PersonSVG, SendSVG, SpinnerSVG } from "@components/SVG";
import { useChatStore } from "@store/chat";
import { useUserStore } from "@store/user";
import { getImageURL } from "@utils/media";
import Image from "next/image";
import type { LegacyRef } from "react";
import React, { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { send, get } from "@services/message";
import { socket } from "@lib/socket";
import { useMessageStore } from "@store/message";

import dayjs from "@lib/dayjs";

const ChatView: ({ chat }: { chat: Chat }) => JSX.Element = ({ chat }) => {
  const { messages, set } = useMessageStore();
  const { user } = useUserStore();

  const contact = chat.users.filter((contact) => contact.id != user.id)[0];

  const divRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onMessages = (messages: Message[]) => {
      set(messages);
      scrollDownChat();
    };

    const msgEvent = `CHAT::${chat.id}::MESSAGES`;
    socket.on(msgEvent, onMessages);
    return () => {
      socket.off(msgEvent, onMessages);
    };
  }, [chat.id]);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    get(chat.id, {
      signal: abortController.signal,
    })
      .then(() => {
        setIsLoading(false);
        scrollDownChat();
      })
      .catch(() => setIsLoading(false));

    return () => {
      abortController.abort();
    };
  }, [chat.id]);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        text: z.string({
          required_error: "Introduzca un nombre",
        }),
      })
    ),
    onSubmit: async (values) => {
      const { text } = values;

      if (isLoading) return;
      setIsLoading(true);
      try {
        // Action
        await send(chat.id, text);
        // On Success
        handleSuccess();
      } catch (error) {
        // On Error
        handleError(error);
      }
      setIsLoading(false);
    },
  });

  const handleSuccess = () => {
    formik.resetForm();
    if (divRef.current) {
      divRef.current.innerHTML = "";
    }
  };

  const scrollDownChat = () => {
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
      }
    }, 0);
  };

  const handleError = (error: unknown) => {
    console.log(error);
  };

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    formik.setFieldValue("text", target.innerText.replace(/\n$/, ""));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (e.ctrlKey && e.key === "Enter") {
      document.execCommand("insertLineBreak");
      formik.setFieldValue("text", target.innerText.replace(/\n$/, ""));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      formik.handleSubmit();
      return;
    }
  };

  const handlePlaceholderClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
    const previousElementSibling =
      target.previousElementSibling as HTMLDivElement;
    previousElementSibling.focus();
  };

  const renderMessages = () => {
    const messagesList = [];
    let prevDate = dayjs().add(1, "day").format("DD/MM/YYYY");
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      if (!message) break;

      const currentDate = dayjs(message.createdAt).format("DD/MM/YYYY");
      if (prevDate !== currentDate) {
        messagesList.push(
          <div
            key={currentDate}
            className={`relative m-4 mx-auto w-max max-w-sm break-words bg-white py-6 px-8 font-display text-base font-semibold
            uppercase text-secondary-500
          `}
          >
            <span>{currentDate}</span>
          </div>
        );
        prevDate = currentDate;
      }

      const isOwnMessage = message.user.id === user.id;

      messagesList.push(
        <div
          key={message.id}
          className={`relative m-4 w-max max-w-sm break-words py-6 px-8 font-display text-base font-semibold uppercase ${
            isOwnMessage
              ? "ml-auto bg-secondary-500 text-right text-white"
              : "bg-white text-secondary-500"
          }`}
        >
          <span>{message.message}</span>
          <span className="absolute bottom-1 right-1 text-xs">
            {dayjs(message.createdAt).format("hh:mm a")}
          </span>
        </div>
      );
    }

    return messagesList;
  };

  if (!contact) return <></>;

  return (
    <div className="relative col-span-7 flex w-full flex-1 flex-col bg-gray-50">
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
      <div
        ref={messagesRef}
        className="relative max-h-[calc(100vh-15rem)] flex-1 overflow-y-auto bg-gray-50"
      >
        {renderMessages()}
      </div>
      <div className="absolute bottom-0 flex w-full items-center gap-4 bg-white p-4">
        <div
          ref={divRef}
          className="h-full max-h-24 w-full overflow-y-scroll break-words bg-white p-4 outline-none focus:outline-secondary-500"
          onInput={handleInputChange}
          onKeyDown={handleKeyDown}
          contentEditable
        />
        {formik.values.text ? null : (
          <div
            className="absolute top-8 left-8 cursor-text select-none"
            onClick={handlePlaceholderClick}
          >
            Escribe un mensaje
          </div>
        )}
        <div
          className="flex h-14 w-14 cursor-pointer items-center justify-center bg-secondary-500  p-2 text-white transition-all hover:bg-secondary-700"
          onClick={() => formik.handleSubmit()}
        >
          {isLoading ? (
            <SpinnerSVG className="mx-auto h-6 w-6 animate-spin" />
          ) : (
            <SendSVG className="h-8 w-8" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
