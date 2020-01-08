import React from "react";
import classNames from "classnames";

const Spinner: React.FC = () => {
  const classes = classNames(["self-center", "m-6"]);

  return <span className={classes}>Loading...</span>;
};

export default Spinner;
