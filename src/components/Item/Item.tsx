import React from "react";
import classNames from "classnames";

import { firestore } from "../../firebase";

import Alert from "../Alert/Alert";

interface Props {
  id: string;
  title: string;
}

const Item: React.FC<Props> = ({ id, title }) => {
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      firestore
        .collection("items")
        .doc(id)
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
    "mb-1"
  ]);

  const checkboxClasses = classNames([
    "mr-1",
    "bg-white",
    "appearance-none",
    "border-2",
    "border-gray-500",
    "p-2",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:bg-gray-100",
    "focus:border-teal-500"
  ]);

  return (
    <div className={classes}>
      {error.length > 0 && <Alert title="Error" message={error} />}

      <input
        type="checkbox"
        className={checkboxClasses}
        onChange={handleChange}
      />
      {title}
    </div>
  );
};

export default Item;
