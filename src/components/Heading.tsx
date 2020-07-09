import React from "react";
import classNames from "classnames";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  level: Level;
  children: React.ReactNode;
}

const Heading: React.FC<Props> = ({ level, children }) => {
  const classes = classNames(["text-teal-500", "font-bold", "leading-none"], {
    "text-5xl": level === 1,
    "text-4xl": level === 2,
    "text-3xl": level === 3,
    "text-2xl": level === 4,
    "text-xl": level === 5,
    "text-lg": level === 6,
  });

  return React.createElement(`h${level}`, { class: classes }, children);
};

export default Heading;
