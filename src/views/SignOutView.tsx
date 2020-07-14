import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { auth } from "../firebase";

import ErrorPage from "../components/ErrorPage";

const SignInView: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    auth
      .signOut()
      .then(() => history.push("/"))
      .catch((error: Error) => setError(error));

    return;
  }, [history]);

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return null;
};

export default SignInView;
