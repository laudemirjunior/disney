import React from "react";
import Header from "../../components/header";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children }) => children,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Input Component", () => {
  it("should be able to render an input", () => {
    const { getByText } = render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Header />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    expect(screen.getByPlaceholderText("Search...")).toBeTruthy();
  });
});

describe("Search", () => {
  it("should be able to search", async () => {
    const { getByText } = render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Header />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );
    const textFild = screen.getByPlaceholderText("Search...");
    const buttonElement = screen.getByRole("button", {
      name: /search/i,
    });

    fireEvent.change(textFild, { target: { value: "'Olu Mel" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(textFild).toHaveValue("'Olu Mel");
    });
  });
});
