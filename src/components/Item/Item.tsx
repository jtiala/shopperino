import React from "react";
import classNames from "classnames";

interface Props {
  name: string;
}

const Item: React.FC<Props> = ({ name }) => {
  const classes = classNames([
    "flex",
    "flex-grow",
    "items-center",
    "justify-between",
    "flex-wrap",
    "bg-gray-200",
    "p-4",
    "m-1"
  ]);

  return <li className={classes}>{name}</li>;
};

export default Item;
