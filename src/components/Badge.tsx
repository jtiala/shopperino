import React from "react";
import classNames from "classnames";
import Text from "./Text";

interface Props {
  variant?: "default" | "primary";
  children: React.ReactNode;
}

const Badge: React.FC<Props> = ({ variant = "default", children }) => {
  const className = classNames(
    ["inline-flex", "py-1", "px-2", "rounded", "text-xs", "uppercase"],
    variant === "default" && ["text-white", "bg-gray-600"],
    variant === "primary" && ["text-white", "bg-teal-500"]
  );

  return (
    <div className={className}>
      <Text as="strong">{children}</Text>
    </div>
  );
};

export default Badge;
