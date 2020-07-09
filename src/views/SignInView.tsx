import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { auth, googleProvider } from "../firebase";

import Page from "../components/Page";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Stack from "../components/Stack";

const SignInView: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(() => history.push("/"))
      .catch((err: string) => {
        setError(err);
      });
  };

  return (
    <Page title="Sign in">
      <Stack>
        <Button variant="primary" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
      </Stack>
      {error.length > 0 && <Alert title="Error" message={error} />}
    </Page>
  );
};

export default SignInView;
