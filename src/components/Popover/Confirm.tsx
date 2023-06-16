import { Root, Trigger, Portal, Content, Arrow } from "@radix-ui/react-popover";
import React from "react";
import { SpinnerSVG } from "../SVG";

const Confirm: ({
  open,
  isLoading,
  trigger,
  content,
}: {
  open: boolean;
  isLoading: boolean;
  trigger: React.ReactNode;
  content: React.ReactNode;
}) => JSX.Element = ({ open, isLoading, trigger, content }) => {
  return (
    <Root open={open}>
      <Trigger asChild>{trigger}</Trigger>
      {open ? (
        <Portal>
          <Content
            className="PopoverContent z-50 border bg-white shadow-lg"
            sideOffset={6}
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

export default Confirm;
