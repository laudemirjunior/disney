import React from "react";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Header from "../../components/header";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children }) => children,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("render input component", () => {
  it("should be able to render an input", async () => {
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Header />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Busque um personagem...")
      ).toBeTruthy();
    });
  });
});

describe("do a search", () => {
  it("should be able to to a search", async () => {
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Header />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    const textFild = screen.getByPlaceholderText("Busque um personagem...");

    const buttonElement = screen.getByRole("button", {
      name: /search/i,
    });

    fireEvent.change(textFild, { target: { value: "'Olu Mel" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(textFild).toHaveValue("'Olu Mel");
    });

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/search");
    });
  });
});

describe("error when doing a search", () => {
  it("should be able to clear the error after failing to do a search", async () => {
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Header />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    const textFild = screen.getByPlaceholderText("Busque um personagem...");

    const buttonElement = screen.getByRole("button", {
      name: /search/i,
    });

    fireEvent.change(textFild, { target: { value: "lo" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(textFild).toHaveValue("lo");
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Sua pesquisa deve conter no mínimo 3 caracteres!/)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockHistoryPush).not.toHaveBeenCalledWith("/search");
    });
  });
});
