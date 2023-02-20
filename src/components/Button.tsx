import type { FC, PropsWithChildren } from "react";

type ButtonProps = {
  className?: string;
};
const Button: FC<PropsWithChildren & ButtonProps> = ({
  className,
  children,
}) => {
  return (
    <button
      className={`${
        className || ""
      } text block bg-secondary-500 px-10 py-2 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-700 `}
    >
      {children}
    </button>
  );
};

export default Button;
