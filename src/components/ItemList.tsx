import React from "react";
import { animated, useTransition } from "react-spring";

import { ShoppingListItem } from "../interfaces/ShoppingListItem";

import Item from "./Item";

interface Props {
  items: ShoppingListItem[];
}

const ItemList: React.FC<Props> = ({ items }) => {
  const transition = useTransition(items, (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <ul className="w-full">
      {transition.map(({ item, props, key }) => (
        <animated.li key={item.id} style={props}>
          <Item item={item} />
        </animated.li>
      ))}
    </ul>
  );
};

export default ItemList;
