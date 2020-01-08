import React from "react";
import classNames from "classnames";

interface Props {
  variant?: "success" | "error" | "warning";
  title?: string;
  message?: string;
}

const Alert: React.FC<Props> = ({ variant, title, message }) => {
  const successClasses = ["bg-green-100", "border-green-500", "text-green-700"];

  const errorClasses = [
    "bg-orange-100",
    "border-orange-500",
    "text-orange-700"
  ];

  const warningClasses = [
    "bg-yellow-100",
    "border-yellow-500",
    "text-yellow-700"
  ];

  const classes = classNames([
    "border-l-4",
    "p-4",
    variant === "success" && successClasses,
    variant === "error" && errorClasses,
    variant === "warning" && warningClasses
  ]);

  return (
    <div className={classes} role="alert">
      {title && <p className="font-bold">{title}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Alert;
