import React from "react";
import classNames from "classnames";
import Text from "./Text";

interface Props {
  children: React.ReactNode;
}

const Badge: React.FC<Props> = ({ children }) => {
  const className = classNames([
    "inline-flex",
    "py-1",
    "px-2",
    "rounded",
    "bg-teal-500",
    "text-white",
    "text-xs",
    "uppercase",
  ]);

  return (
    <div className={className}>
      <Text as="strong">{children}</Text>
    </div>
  );
};

export default Badge;
