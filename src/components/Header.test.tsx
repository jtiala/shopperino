import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

test("renders title in header", () => {
  const { getByText } = render(<Header />);
  const element = getByText(/shopperino/i);

  expect(element).toBeInTheDocument();
});
