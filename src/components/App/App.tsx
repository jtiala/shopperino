import React from "react";
import classNames from "classnames";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase";

import SignInView from "../SignInView/SignInView";
import Spinner from "../Spinner/Spinner";
import Alert from "../Alert/Alert";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MainView from "../MainView/MainView";

const App: React.FC = () => {
  const classes = classNames(["flex", "flex-col"]);

  const [user, loading, error] = useAuthState(auth);

  const getContent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <Alert title="Error" message={error.message} />;
    }

    if (user) {
      return <MainView />;
    }

    return <SignInView />;
  };

  return (
    <div className={classes}>
      <Header />
      {getContent()}
      <Footer user={user} />
    </div>
  );
};

export default App;
