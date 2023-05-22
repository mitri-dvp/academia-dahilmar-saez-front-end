import type { FC, PropsWithChildren } from "react";
import { SpinnerSVG } from "./SVG";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};
const Button: FC<PropsWithChildren & ButtonProps> = ({
  children,
  className,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      className={`${
        className || ""
      } text block bg-secondary-500 px-10 py-2 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-700`}
      disabled={disabled}
    >
      {loading ? (
        <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-white" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
