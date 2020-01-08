import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders title in header", () => {
  const { getByText } = render(<App />);
  const element = getByText(/shopperino/i);
  expect(element).toBeInTheDocument();
});
