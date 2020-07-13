import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";
import { NewShoppingListItem } from "../interfaces/ShoppingListItem";

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

    if (!user) {
      setError("Invalid user");

      return;
    }

    const currentDate = new Date();

    const newItem: NewShoppingListItem = {
      title,
      status: "active",
      createdAt: currentDate,
      createdBy: user.uid,
      updatedAt: currentDate,
      updatedBy: user.uid,
    };

    firestore
      .collection("shoppingLists")
      .doc(shoppingList.id)
      .collection("items")
      .add(newItem)
      .then(() => {
        setTitle("");

        firestore
          .collection("shoppingLists")
          .doc(shoppingList.id)
          .update({
            updatedAt: currentDate,
            updatedBy: user.uid,
          })
          .catch((err: string) => {
            setError(err);
          });
      })
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
