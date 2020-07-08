import React from "react";
import classNames from "classnames";
import { User } from "firebase";

import { auth } from "../../firebase";

import Button from "../Button/Button";

interface Props {
  user?: User;
}

const Footer: React.FC<Props> = ({ user }) => {
  const classes = classNames([
    "flex",
    "justify-center",
    "p-6",
    "mt-6",
    "text-sm",
    "text-gray-600",
  ]);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <footer className={classes}>
      {user && (
        <p>
          Signed in as {user.displayName}.{" "}
          <Button size="small" onClick={signOut}>
            Sign out
          </Button>
        </p>
      )}
    </footer>
  );
};

export default Footer;
