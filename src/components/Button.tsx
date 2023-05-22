import type { FC, PropsWithChildren } from "react";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
};
const Button: FC<PropsWithChildren & ButtonProps> = ({
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      className={`${
        className || ""
      } text block bg-secondary-500 px-10 py-2 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-700`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
