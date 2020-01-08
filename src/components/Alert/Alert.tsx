import React from "react";
import classNames from "classnames";

interface Props {
  variant?: "success" | "error";
  title?: string;
  message?: string;
}

const Alert: React.FC<Props> = ({ variant, title, message }) => {
  const errorClasses = [
    "bg-orange-100",
    "border-orange-500",
    "text-orange-700"
  ];

  const classes = classNames([
    "border-l-4",
    "p-4",
    "bg-green-100",
    "border-green-500",
    "text-green-700",
    variant === "error" && errorClasses
  ]);

  return (
    <div className={classes} role="alert">
      {title && <p className="font-bold">{title}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Alert;
