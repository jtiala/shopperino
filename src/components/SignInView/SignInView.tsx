import React from "react";
import classNames from "classnames";

import { auth, googleProvider } from "../../firebase";

import Button from "../Button/Button";

const SignInView: React.FC = () => {
  const classes = classNames([
    "flex",
    "flex-col",
    "self-center",
    "max-w-md",
    "m-6"
  ]);

  const signInWithGoogle = () => {
    auth.signInWithRedirect(googleProvider);
  };

  return (
    <div className={classes}>
      <Button size="large" variant="primary" onClick={signInWithGoogle}>
        Click here to sign in with Google
      </Button>
    </div>
  );
};

export default SignInView;
