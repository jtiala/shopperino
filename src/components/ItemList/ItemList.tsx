import React from "react";
import classNames from "classnames";
import { animated, useTransition } from "react-spring";

import Item from "../Item/Item";

interface Props {
  docs: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[];
}

const ItemList: React.FC<Props> = ({ docs }) => {
  const transition = useTransition(docs, doc => doc.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const classes = classNames(["flex", "flex-col"]);

  return (
    <ul className={classes}>
      {transition.map(({ item, props, key }) => (
        <animated.li key={item.id} style={props}>
          <Item id={item.id} title={item.data()?.title} />
        </animated.li>
      ))}
    </ul>
  );
};

export default ItemList;
