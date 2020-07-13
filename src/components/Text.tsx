import React from "react";

interface Props {
  as?: "p" | "span" | "strong" | "small" | "code";
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<Props> = ({ as = "p", children, ...props }) =>
  React.createElement(as, props, children);

export default Text;
