import React from "react";
import classNames from "classnames";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../../firebase";

import Alert from "../Alert/Alert";
import Button from "../Button/Button";
import Input from "../Input/Input";

const AddItem: React.FC = () => {
  const classes = classNames(["flex", "flex-col", "pb-4"]);
  const [user] = useAuthState(auth);
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (user) {
      firestore
        .collection("items")
        .add({
          title,
          uid: user.uid,
          timestamp: new Date().getTime(),
        })
        .then(() => setTitle(""))
        .catch((err: string) => {
          setError(err);
        });
    }
  };

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <h3 className="text-teal-500 font-bold mb-2">Add item</h3>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="milk, butter, eggs..."
      />
      <Button type="submit" variant="primary" disabled={title.length < 1}>
        Add
      </Button>
      {error.length > 0 && <Alert title="Error" message={error} />}
    </form>
  );
};

export default AddItem;
