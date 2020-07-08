import React from "react";
import classNames from "classnames";

interface Props {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ value, placeholder, onChange }) => {
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
    "mb-2",
  ]);

  return (
    <input
      className={classes}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type="text"
    />
  );
};

export default Input;
