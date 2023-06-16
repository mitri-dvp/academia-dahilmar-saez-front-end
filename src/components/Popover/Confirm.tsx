import { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import React from "react";
import { CrossSVG, PersonSVG, SpinnerSVG } from "../SVG";
import { useGroupStore } from "@store/group";
import { get } from "@services/group";
import { USER_ROLES } from "@utils/global";
import Image from "next/image";
import { getImageURL } from "@utils/media";
import { create } from "@services/chat";
import { useUserStore } from "@store/user";
import { useChatStore } from "@store/chat";
import { useToastStore } from "@store/toast";
import Button from "@components/Button";

const Confirm: ({
  open,
  isLoading,
  onClose,
  onConfirm,
  children,
}: {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}) => JSX.Element = ({ open, isLoading, onClose, onConfirm, children }) => {
  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      {open ? (
        <Popover.Portal>
          <Popover.Content
            className="PopoverContent z-50 border bg-white shadow-lg"
            sideOffset={6}
          >
            {isLoading ? (
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            ) : (
              <div>
                <div className="mb-4 text-center text-lg font-semibold">
                  Confirmación
                </div>
                <div className="text-center">¿Desea borrar el grupo?</div>
                <div className="text-center">Esta acción es irreversible</div>
                <div className="mt-4 flex gap-4">
                  <Button styles="w-1/2" color="clear" onClick={onClose}>
                    No
                  </Button>
                  <Button styles="w-1/2" onClick={onConfirm}>
                    Si
                  </Button>
                </div>
              </div>
            )}
            <Popover.Arrow className="PopoverArrow" />
          </Popover.Content>
        </Popover.Portal>
      ) : null}
    </Popover.Root>
  );
};

export default Confirm;
