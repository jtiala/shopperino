import React from "react";
import { Link as ReactRouterLink, LinkProps } from "react-router-dom";

import { buttonClasses, Props as ButtonProps } from "./Button";

interface Props extends LinkProps {
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
}

const ButtonLink: React.FC<Props> = ({
  children,
  size = "normal",
  variant = "default",
  ...props
}) => {
  return (
    <ReactRouterLink {...props} className={buttonClasses(size, variant)}>
      {children}
    </ReactRouterLink>
  );
};

export default ButtonLink;
