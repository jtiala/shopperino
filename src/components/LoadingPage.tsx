import React, { useState, useEffect } from "react";

import Page from "./Page";
import Spinner from "./Spinner";

const LoadingPage: React.FC = () => {
  const [timeoutPassed, setTimeoutPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutPassed(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (timeoutPassed) {
    return (
      <Page title="Loading...">
        <Spinner />
      </Page>
    );
  }

  return <Page title="" />;
};

export default LoadingPage;
