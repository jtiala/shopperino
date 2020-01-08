import React from "react";
import classNames from "classnames";

import ItemList from "../ItemList/ItemList";
import AddItem from "../AddItem/AddItem";

const MainView: React.FC = () => {
  const classes = classNames(["flex", "flex-col", "p-6"]);

  return (
    <div className={classes}>
      <AddItem />
      <ItemList />
    </div>
  );
};

export default MainView;
