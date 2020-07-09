import React from "react";
import classNames from "classnames";

import Stack from "./Stack";
import Text from "./Text";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<Props> = ({ label, ...props }) => {
  const classes = classNames([
    "bg-gray-100",
    "appearance-none",
    "border-2",
    "border-gray-200",
    "py-2",
    "px-4",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:bg-white",
    "focus:border-teal-500",
  ]);

  return (
    <label>
      <Stack gap={1}>
        <Text as="strong">{label}</Text>
        <input className={classes} type="text" {...props} />
      </Stack>
    </label>
  );
};

export default Input;
