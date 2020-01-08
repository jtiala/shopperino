import React from "react";
import classNames from "classnames";

import Item from "../Item/Item";

const items = [
  {
    id: 1,
    name: "Olutta"
  },
  {
    id: 2,

    name: "Olutta"
  },
  {
    id: 3,
    name: "Olutta"
  },
  {
    id: 4,
    name: "Olutta"
  },
  {
    id: 5,
    name: "Suklaata"
  },
  {
    id: 6,
    name: "Olutta"
  }
];

const ItemList: React.FC = () => {
  const classes = classNames(["flex", "flex-col"]);

  return (
    <ul className={classes}>
      {items.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default ItemList;
