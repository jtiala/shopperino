import React from "react";
import classNames from "classnames";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../../firebase";

import Item from "../Item/Item";
import Spinner from "../Spinner/Spinner";
import Alert from "../Alert/Alert";

const ItemList: React.FC = () => {
  const classes = classNames(["flex", "flex-col"]);
  const [user] = useAuthState(auth);

  const [snapshot, loading, error] = useCollection(
    firestore
      .collection("items")
      .where("uid", "==", user?.uid)
      .orderBy("timestamp", "desc")
  );

  if (loading) {
    return <Spinner />;
  }

  if (snapshot) {
    if (snapshot.docs.length < 1) {
      return <Alert variant="warning" message="No items!" />;
    }

    return (
      <ul className={classes}>
        {snapshot.docs.map(doc => {
          return <Item key={doc.id} id={doc.id} title={doc.data().title} />;
        })}
      </ul>
    );
  }

  return <Alert variant="error" title="Error" message={error?.message} />;
};

export default ItemList;
