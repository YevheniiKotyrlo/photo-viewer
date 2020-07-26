import React from "react";
import { App } from "../index";
import { render } from "@testing-library/react";

test("app a have name", () => {
  const { getByText } = render(<App />);
  const appName = getByText(/Implexis/i);
  expect(appName).toBeInTheDocument();
});
