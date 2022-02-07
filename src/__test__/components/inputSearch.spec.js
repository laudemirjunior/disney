import React from "react";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { fireEvent, render, screen } from "@testing-library/react";
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
  it("should be able to render an input", () => {
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Header />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    const placeholder = screen.getByPlaceholderText("Busque um personagem...");

    expect(placeholder).toBeTruthy();
  });
});

describe("do a search", () => {
  it("should be able to to a search", () => {
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

    expect(textFild).toHaveValue("'Olu Mel");
    expect(mockHistoryPush).toHaveBeenCalledWith("/search");
  });
});

describe("error when doing a search", () => {
  it("should be able to clear the error after failing to do a search", () => {
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

    expect(textFild).toHaveValue("lo");
    expect(
      screen.getByText(/Sua pesquisa deve conter no mínimo 3 caracteres!/)
    ).toBeInTheDocument();
    expect(mockHistoryPush).not.toHaveBeenCalledWith("/search");
  });
});
