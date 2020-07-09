import React from "react";
import classNames from "classnames";

import { firestore } from "../firebase";
import { ShoppingListItem } from "../interfaces/ShoppingListItem";

import Alert from "./Alert";
import Stack from "./Stack";
import Text from "./Text";

interface Props {
  item: ShoppingListItem;
}

const Item: React.FC<Props> = ({ item }) => {
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setChecked(true);

      firestore
        .collection("items")
        .doc(item.id)
        .delete()
        .catch((err: string) => {
          setError(err);
        });
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
      {error.length > 0 && <Alert title="Error" message={error} />}
    </div>
  );
};

export default Item;
