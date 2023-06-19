import { useState } from "react";
import { Root, Trigger, Portal, Content, Arrow } from "@radix-ui/react-popover";
import React from "react";
import { SpinnerSVG } from "../SVG";

const NotificationOptions: ({
  open,
  onClose,
  trigger,
  content,
}: {
  open: boolean;
  onClose: () => void;
  trigger: React.ReactNode;
  content: React.ReactNode;
}) => JSX.Element = ({ open, onClose, trigger, content }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Root open={open}>
      <Trigger asChild>{trigger}</Trigger>
      {open ? (
        <Portal>
          <Content
            className="PopoverContent z-50 w-max border bg-white p-1 shadow-lg outline-none"
            sideOffset={6}
            onBlur={onClose}
          >
            {isLoading ? (
              <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
            ) : (
              <>{content}</>
            )}
            <Arrow className="PopoverArrow" />
          </Content>
        </Portal>
      ) : null}
    </Root>
  );
};

export default NotificationOptions;
