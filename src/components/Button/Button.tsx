import React from "react";
import classNames from "classnames";

interface Props {
  children?: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: "normal" | "small" | "large";
  variant?: "default" | "primary";
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  size = "normal",
  variant = "default"
}) => {
  const normalClasses = ["p-2", "text-base"];
  const smallClasses = ["p-1", "text-xs"];
  const largeClasses = ["p-4", "text-xl"];
  const defaultClasses = ["text-white", "bg-gray-500", "hover:bg-gray-400"];
  const primaryClasses = ["text-white", "bg-teal-500", "hover:bg-teal-400"];

  const classes = classNames([
    "tracking-tight",
    "font-semibold",
    size === "normal" && normalClasses,
    size === "small" && smallClasses,
    size === "large" && largeClasses,
    variant === "default" && defaultClasses,
    variant === "primary" && primaryClasses
  ]);

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
