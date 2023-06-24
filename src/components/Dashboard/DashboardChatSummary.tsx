import { PersonSVG } from "@components/SVG";
import { maxHeaderSize } from "http";
import Image from "next/image";
import React from "react";

const DashboardChatSummary = () => {
  return (
    <div className="flex h-full gap-4">
      <div className="flex w-full cursor-pointer select-none gap-4 bg-white py-4 pr-4 pl-10 transition-all hover:bg-gray-100">
        <div className="relative my-auto aspect-square h-12 w-12">
          <Image
            className="aspect-square h-12 w-12 rounded-full object-cover"
            src={"/img/carlos-ferrer.jpg"}
            alt={""}
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="break-all text-lg font-bold text-dark-500 line-clamp-2">
            Carlos Ferrer
          </h1>
          <div className="line-clamp-1">Saludos, buenas tardes</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChatSummary;
