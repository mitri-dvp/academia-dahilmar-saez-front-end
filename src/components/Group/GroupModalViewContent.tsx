import { useState } from "react";

import React from "react";
import { CrossSVG, PencilSquareSVG, PersonSVG, TrashFillSVG } from "../SVG";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import { useUserStore } from "@store/user";

import GroupDeleteButton from "@components/Button/GroupDeleteButton";

const GroupModalViewContent: ({
  group,
  onClose,
  toggleEditing,
}: {
  group: Group;
  onClose: () => void;
  toggleEditing: () => void;
}) => JSX.Element = ({ group, onClose, toggleEditing }) => {
  const userStore = useUserStore();

  const [query, setQuery] = useState("");

  return (
    <React.Fragment>
      <div className="flex justify-end gap-4">
        <GroupDeleteButton group={group} onConfirm={onClose} />

        <button onClick={toggleEditing} type="button">
          <PencilSquareSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
        </button>
        <button onClick={onClose} type="button">
          <CrossSVG className="h-6 w-6 text-dark-500 transition-all hover:text-secondary-500" />
        </button>
      </div>
      <div>
        <div className="mb-6 text-center font-display text-lg font-semibold uppercase md:text-2xl">
          {group.name}
        </div>
        <div className="mx-auto space-y-8 md:w-96">
          <div className="text-sm md:text-base">{group.description}</div>
          <div className="text-sm font-semibold md:text-base">Integrantes</div>

          <div className="relative z-0">
            <input
              type="text"
              id="users"
              className="dark:focus:border-sering-secondary-300 peer block w-full appearance-none border-0 border-b-2 border-dark-500 bg-transparent py-2.5 px-0 text-dark-500 focus:border-secondary-500 focus:outline-none focus:ring-0 dark:border-dark-500 dark:text-white"
              placeholder="Buscar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="max-h-72 overflow-y-auto">
            {group.users
              .filter((user) =>
                Boolean(`${user.firstName} ${user.lastName}`.includes(query))
              )
              .sort((a, b) => Number(a.lastName > b.lastName))
              .map((user) => {
                if (user.id === userStore.user.id) return null;

                return (
                  <div
                    key={user.id}
                    className="flex w-full select-none gap-4 bg-white p-3 transition-all hover:bg-gray-100"
                  >
                    <div className="relative my-auto aspect-square h-12 w-12">
                      {user.photo ? (
                        <Image
                          className="h-12 w-12 rounded-full object-cover"
                          src={getImageURL(user.photo)}
                          alt={user.photo.name}
                          width={48}
                          height={48}
                        />
                      ) : (
                        <PersonSVG className="aspect-square h-12 w-12" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <h1 className="text-sm font-bold text-dark-500 md:text-base">
                        {user.firstName} {user.lastName}
                      </h1>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GroupModalViewContent;
