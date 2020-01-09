import React from "react";
import classNames from "classnames";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../../firebase";

import ItemList from "../ItemList/ItemList";
import AddItem from "../AddItem/AddItem";
import Spinner from "../Spinner/Spinner";
import Alert from "../Alert/Alert";

const MainView: React.FC = () => {
  const [user] = useAuthState(auth);

  const [snapshot, loading, error] = useCollection(
    firestore
      .collection("items")
      .where("uid", "==", user?.uid)
      .orderBy("timestamp", "desc")
  );

  const getContent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <Alert variant="error" title="Error" message={error?.message} />;
    }

    if (snapshot) {
      if (snapshot.docs.length < 1) {
        return <Alert variant="warning" message="No items!" />;
      } else {
        return <ItemList docs={snapshot.docs} />;
      }
    }
  };

  const classes = classNames(["flex", "flex-col", "p-6"]);

  return (
    <div className={classes}>
      <AddItem />
      {getContent()}
    </div>
  );
};

export default MainView;
