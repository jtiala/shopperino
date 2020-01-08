import React from "react";
import classNames from "classnames";

import Header from "../Header/Header";
import ItemList from "../ItemList/ItemList";

const App: React.FC = () => {
  const classes = classNames(["flex", "flex-col"]);

  return (
    <div className={classes}>
      <Header />
      <ItemList />
    </div>
  );
};

export default App;
