import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";

import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

interface Props {
  children?: React.ReactNode;
}

const AuthenticationWrapper: React.FC<Props> = ({ children }) => {
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  if (user) {
    return <>{children}</>;
  }

  history.push("/sign-in");

  return null;
};

export default AuthenticationWrapper;
