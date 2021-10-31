import React from "react";
import classNames from "classnames";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestoreCompat } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";
import { ShoppingListItem } from "../interfaces/ShoppingListItem";

import Alert from "./Alert";
import Stack from "./Stack";
import Text from "./Text";

interface Props {
  shoppingList: ShoppingList;
  item: ShoppingListItem;
}

const Item: React.FC<Props> = ({ shoppingList, item }) => {
  const [user] = useAuthState(auth);
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState<Error>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      if (!user) {
        setError(new Error("Invalid user"));

        return;
      }

      setChecked(true);

      firestoreCompat
        .collection("shoppingLists")
        .doc(shoppingList.id)
        .collection("items")
        .doc(item.id)
        .delete()
        .then(() => {
          firestoreCompat
            .collection("shoppingLists")
            .doc(shoppingList.id)
            .update({
              updatedAt: new Date(),
              updatedBy: user.uid,
            })
            .catch((error: Error) => setError(error));
        })
        .catch((error: Error) => setError(error));
    }
  };

  const classes = classNames([
    "flex",
    "flex-grow",
    "items-center",
    "flex-wrap",
    "bg-gray-200",
    "p-4",
    "mb-1",
  ]);

  const checkboxClasses = classNames([
    "mr-1",
    !checked && "bg-white",
    checked && "bg-gray-400",
    "appearance-none",
    "border-2",
    "border-gray-500",
    "p-2",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:bg-gray-100",
    "focus:border-teal-500",
  ]);

  return (
    <div className={classes}>
      <Stack dir="row" gap={2} align="center">
        <input
          type="checkbox"
          className={checkboxClasses}
          onChange={handleChange}
          checked={checked}
        />
        <Text>{item.title}</Text>
      </Stack>
      {error && (
        <Alert variant="error" title="Error">
          {error.message}
        </Alert>
      )}
    </div>
  );
};

export default Item;
