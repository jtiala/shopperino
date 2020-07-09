import React, { useState, useEffect } from "react";
import classNames from "classnames";

import Stack from "./Stack";
import Header from "./Header";
import Heading from "./Heading";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Page: React.FC<Props> = ({ title, children }) => {
  const [timeoutPassed, setTimeoutPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutPassed(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const classes = classNames([
    "container",
    "mx-auto",
    "px-4",
    "transition-opacity",
    "duration-100",
    "ease-in-out",
    timeoutPassed ? "opacity-100" : "opacity-0",
  ]);

  return (
    <Stack align="stretch">
      <Header />
      <div className={classes}>
        <Stack gap={8}>
          {title && <Heading level={2}>{title}</Heading>}
          {children}
        </Stack>
      </div>
    </Stack>
  );
};

export default Page;
