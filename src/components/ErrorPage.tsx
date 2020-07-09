import React from "react";

import Page from "./Page";
import Alert from "./Alert";

interface Props {
  message?: string;
}

const LoadingPage: React.FC<Props> = ({ message }) => (
  <Page title="Oh no!">
    <Alert title="An error occured :(" message={message} />
  </Page>
);

export default LoadingPage;
