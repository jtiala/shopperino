import React from "react";
import classNames from "classnames";

interface Props {
  title: string;
}

const Item: React.FC<Props> = ({ title }) => {
  const classes = classNames([
    "flex",
    "flex-grow",
    "items-center",
    "justify-between",
    "flex-wrap",
    "bg-gray-200",
    "p-4",
    "mb-1"
  ]);

  return <li className={classes}>{title}</li>;
};

export default Item;
