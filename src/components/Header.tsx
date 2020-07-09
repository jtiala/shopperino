import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";

import Stack from "./Stack";
import Text from "./Text";
import Button from "./Button";

const Logo: React.FC = () => (
  <span role="img" aria-label="logo">
    🛒
  </span>
);

const Title: React.FC = () => {
  const classes = classNames([
    "text-white",
    "font-semibold",
    "text-xl",
    "tracking-tight",
    "hover:text-gray-200",
    "block",
  ]);

  return (
    <h1 className={classes}>
      <Link to={"/"}>
        <Stack dir="row" gap={2}>
          <Logo />
          <Text>Shopperino</Text>
        </Stack>
      </Link>
    </h1>
  );
};

const Header: React.FC = () => {
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <header className="bg-teal-500 py-6">
      <div className="container mx-auto px-4">
        <Stack
          dir="row"
          align="center"
          justify="between"
          responsive={true}
          gap={4}
        >
          <Title />
          {user && (
            <Stack dir="row" gap={2} align="center">
              <Text as="small" className="text-white">
                Signed in as {user.displayName}.{" "}
              </Text>
              <Button size="small" onClick={signOut}>
                Sign out
              </Button>
            </Stack>
          )}
        </Stack>
      </div>
    </header>
  );
};

export default Header;
