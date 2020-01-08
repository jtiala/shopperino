import React from "react";
import classNames from "classnames";

import ItemList from "../ItemList/ItemList";

const MainView: React.FC = () => {
  const classes = classNames(["flex", "flex-col", "p-6"]);

  return (
    <div className={classes}>
      <ItemList />
    </div>
  );
};

export default MainView;
