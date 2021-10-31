import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestoreCompat, Timestamp } from "../firebase";
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
  const [error, setError] = React.useState<Error>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!user) {
      setError(new Error("Invalid user"));

      return;
    }

    const currentDate = Timestamp.fromDate(new Date());

    const newItem: NewShoppingListItem = {
      title,
      status: "active",
      createdAt: currentDate,
      createdBy: user.uid,
      updatedAt: currentDate,
      updatedBy: user.uid,
    };

    firestoreCompat
      .collection("shoppingLists")
      .doc(shoppingList.id)
      .collection("items")
      .add(newItem)
      .then(() => {
        setTitle("");

        firestoreCompat
          .collection("shoppingLists")
          .doc(shoppingList.id)
          .update({
            updatedAt: currentDate,
            updatedBy: user.uid,
          })
          .catch((error: Error) => setError(error));
      })
      .catch((error: Error) => setError(error));
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
      {error && (
        <Alert variant="error" title="Error">
          {error.message}
        </Alert>
      )}
    </form>
  );
};

export default AddItem;
