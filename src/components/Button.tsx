import type { FC, PropsWithChildren } from "react";
import { SpinnerSVG } from "./SVG";

type ButtonProps = {
  styles?: string;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  type?: "button" | "reset" | "submit" | undefined;
};

const Button: FC<
  PropsWithChildren &
    ButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  styles = "",
  loading = false,
  disabled = false,
  color = "primary",
  type = "submit",
  ...rest
}) => {
  styles +=
    " block border-2 border-secondary-500 py-2 font-display font-semibold uppercase tracking-wider transition";

  switch (color) {
    case "primary":
      styles += " bg-secondary-500 text-white hover:bg-secondary-700";
      break;
    case "clear":
      styles +=
        " bg-transparent text-secondary-500 hover:border-secondary-700 hover:text-secondary-700";
      break;
    default:
      styles += "";
      break;
  }

  return (
    <button className={styles} disabled={disabled} type={type} {...rest}>
      {loading ? (
        <SpinnerSVG className="mx-auto h-6 w-6 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
