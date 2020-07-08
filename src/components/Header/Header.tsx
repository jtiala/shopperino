import React from "react";
import classNames from "classnames";

const Logo: React.FC = () => (
  <span role="img" aria-label="logo">
    🛒
  </span>
);

const Title: React.FC = () => {
  const classes = classNames([
    "text-white",
    "font-semibold",
    "text-xl",
    "tracking-tight",
    "hover:text-gray-200",
  ]);

  return (
    <h1 className={classes}>
      <a href="/">
        <Logo /> Shopperino
      </a>
    </h1>
  );
};

const Header: React.FC = () => {
  const classes = classNames([
    "flex",
    "flex-grow",
    "items-center",
    "justify-between",
    "flex-wrap",
    "bg-teal-500",
    "p-6",
  ]);

  return (
    <header className={classes}>
      <Title />
    </header>
  );
};

export default Header;
