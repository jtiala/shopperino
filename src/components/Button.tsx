import React from "react";
import classNames from "classnames";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "normal" | "small" | "large";
  variant?: "default" | "primary" | "danger";
}

export const buttonClasses = (
  size: Props["size"] = "normal",
  variant: Props["variant"] = "default"
) =>
  classNames(
    ["tracking-tight", "font-semibold"],
    size === "normal" && ["p-2", "text-base"],
    size === "small" && ["p-1", "text-xs"],
    size === "large" && ["p-4", "text-xl"],
    variant === "default" && ["text-white", "bg-gray-800", "hover:bg-gray-700"],
    variant === "primary" && ["text-white", "bg-teal-500", "hover:bg-teal-400"],
    variant === "danger" && ["text-white", "bg-red-500", "hover:bg-red-400"]
  );

const Button: React.FC<Props> = ({
  children,
  size = "normal",
  variant = "default",
  ...props
}) => {
  return (
    <button {...props} className={buttonClasses(size, variant)}>
      {children}
    </button>
  );
};

export default Button;
