import React from "react";
import { animated, useTransition } from "react-spring";

import { ShoppingList } from "../interfaces/ShoppingList";
import { ShoppingListItem } from "../interfaces/ShoppingListItem";

import Item from "./Item";

interface Props {
  shoppingList: ShoppingList;
  items: ShoppingListItem[];
}

const ItemList: React.FC<Props> = ({ shoppingList, items }) => {
  items.sort((a, b) =>
    a.createdAt.toMillis() > b.createdAt.toMillis() ? -1 : 1
  );

  const transitions = useTransition(items, {
    keys: (item) => item.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <ul className="w-full">
      {transitions((style, item) => (
        <animated.li key={item.id} style={style}>
          <Item shoppingList={shoppingList} item={item} />
        </animated.li>
      ))}
    </ul>
  );
};

export default ItemList;
