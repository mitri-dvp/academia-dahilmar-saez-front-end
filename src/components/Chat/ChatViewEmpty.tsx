import { PersonSVG, SendSVG } from "@components/SVG";

import Image from "next/image";
import type { FC } from "react";

const ChatViewEmpty: FC = () => {
  return (
    <>
      <div className="flex w-full cursor-pointer select-none gap-4 bg-white p-4 transition-all hover:bg-gray-50">
        <div className="relative my-auto aspect-square h-10 w-10">
          <PersonSVG className="aspect-square h-10 w-10" />
        </div>
        <div className="flex items-center">
          <h1 className="text-base font-bold text-dark-500">
            Seleccione un chat
          </h1>
        </div>
      </div>
      <div className="relative flex-1 ">
        <Image
          className="absolute top-1/2 left-1/2 h-32 w-auto -translate-x-1/2 -translate-y-1/2 opacity-50"
          src="/logo.png"
          alt="academia-dahilmar-saez-logo"
          width={300}
          height={40}
        />
      </div>
      <div className="relative flex w-full items-center gap-4 p-3  opacity-80">
        <div className="h-full max-h-24 w-full overflow-y-scroll break-words bg-white p-4 outline-none focus:outline-secondary-500" />
        <div className="absolute top-8 left-8 cursor-text select-none"></div>
        <div className="flex h-14 w-14 items-center justify-center bg-secondary-500  p-2 text-white">
          <SendSVG className="h-8 w-8" />
        </div>
      </div>
    </>
  );
};

export default ChatViewEmpty;
