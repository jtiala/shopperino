import React from "react";
import classNames from "classnames";

interface Props {
  as?:
    | "div"
    | "section"
    | "article"
    | "header"
    | "footer"
    | "nav"
    | "main"
    | "aside";
  id?: string;
  htmlContent?: string;
  children?: React.ReactNode;
  dir?: "column" | "row";
  gap?: number;
  align?: "stretch" | "start" | "center" | "end" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around";
  responsive?: boolean;
}

const Stack: React.FC<Props> = ({
  as = "div",
  htmlContent,
  children,
  dir = "column",
  gap = 8,
  align = "start",
  justify = "start",
  responsive = false,
}) => {
  const className = classNames(
    ["flex"],
    !responsive && {
      "flex-col": dir === "column",
      "flex-row": dir === "row",
    },
    responsive && {
      "flex-col": true,
      "sm:flex-row": dir === "row",
    },
    {
      "items-stretch": align === "stretch",
      "items-start": align === "start",
      "items-center": align === "center",
      "items-end": align === "end",
      "justify-start": justify === "start",
      "justify-center": justify === "center",
      "justify-end": justify === "end",
      "justify-between": justify === "between",
      "justify-around": justify === "around",
    },
    dir === "row" &&
      !responsive && {
        "space-x-1": gap === 1,
        "space-x-2": gap === 2,
        "space-x-4": gap === 4,
        "space-x-6": gap === 6,
        "space-x-8": gap === 8,
        "space-x-12": gap === 12,
        "space-x-16": gap === 16,
      },
    dir === "column" &&
      !responsive && {
        "space-y-1": gap === 1,
        "space-y-2": gap === 2,
        "space-y-4": gap === 4,
        "space-y-6": gap === 6,
        "space-y-8": gap === 8,
        "space-y-12": gap === 12,
        "space-y-16": gap === 16,
      },
    dir === "row" &&
      responsive && {
        "space-y-1": gap === 1,
        "space-y-2": gap === 2,
        "space-y-4": gap === 4,
        "space-y-6": gap === 6,
        "space-y-8": gap === 8,
        "space-y-12": gap === 12,
        "space-y-16": gap === 16,
        "sm:space-x-1": gap === 1,
        "sm:space-x-2": gap === 2,
        "sm:space-x-4": gap === 4,
        "sm:space-x-6": gap === 6,
        "sm:space-x-8": gap === 8,
        "sm:space-x-12": gap === 12,
        "sm:space-x-16": gap === 16,
        "sm:space-y-0": true,
      }
  );

  const props = {
    className,
    dangerouslySetInnerHTML: htmlContent ? { __html: htmlContent } : undefined,
  };

  // eslint-disable-next-line react/no-danger-with-children
  return React.createElement(as, props, children);
};

export default Stack;
