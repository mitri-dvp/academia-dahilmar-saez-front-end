import { PersonSVG, SendSVG } from "@components/SVG";
import { useChatStore } from "@store/chat";
import { useUserStore } from "@store/user";
import { getImageURL } from "@utils/media";
import Image from "next/image";
import React from "react";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const ChatView: ({ contact }: { contact: User }) => JSX.Element = ({
  contact,
}) => {
  const { chats } = useChatStore();
  const { user } = useUserStore();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        message: z.string({
          required_error: "Introduzca un nombre",
        }),
      })
    ),
    onSubmit: async (values) => {
      console.log(values);

      try {
        // Action
        // await edit(editValues);
        // On Success
        // handleSuccess();
      } catch (error) {
        // On Error
        // handleError(error);
      }
    },
  });

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    formik.setFieldValue("message", target.innerText.replace(/\n$/, ""));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (e.ctrlKey && e.key === "Enter") {
      document.execCommand("insertLineBreak");
      formik.setFieldValue("message", target.innerText.replace(/\n$/, ""));
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
      <div className="relative flex w-full items-center gap-4 p-4">
        <div
          contentEditable
          className="max-h-24 w-full overflow-y-scroll break-all bg-white p-4 outline-none focus:outline-secondary-500"
          onInput={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {formik.values.message ? null : (
          <div
            className="absolute top-8 left-8 cursor-text select-none"
            onClick={handlePlaceholderClick}
          >
            Escribe un mensaje
          </div>
        )}
        <div className="flex h-14 w-14 cursor-pointer items-center justify-center bg-secondary-500  p-2 text-white transition-all hover:bg-secondary-700">
          <SendSVG className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
