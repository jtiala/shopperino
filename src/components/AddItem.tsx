import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";

import Alert from "./Alert";
import Button from "./Button";
import Input from "./Input";
import Stack from "./Stack";

interface Props {
  shoppingList: ShoppingList;
}

const AddItem: React.FC<Props> = ({ shoppingList }) => {
  const [user] = useAuthState(auth);
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    firestore
      .collection("items")
      .add({
        title,
        uid: user?.uid,
        list: firestore.collection("lists").doc(shoppingList.id),
        timestamp: new Date().getTime(),
      })
      .then(() => setTitle(""))
      .catch((err: string) => {
        setError(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={2} dir="row" align="end">
        <Input
          label="Add item"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="milk, butter, eggs..."
        />
        <Button type="submit" variant="primary" disabled={title.length < 1}>
          Add
        </Button>
      </Stack>
      {error.length > 0 && <Alert title="Error" message={error} />}
    </form>
  );
};

export default AddItem;
