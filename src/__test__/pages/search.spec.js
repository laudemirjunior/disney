import React from "react";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "../../pages/search";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import fakeCharacter from "../mock/fakeCharacter";

const apiMock = new MockAdapter(axios);
const mockHistoryPush = jest.fn();

class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("render character card when doing a survey", () => {
  it("should be able to render character card when doing a survey", async () => {
    apiMock.onGet("/characters").reply(200, fakeCharacter);
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Search />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    const textFild = screen.getByPlaceholderText("Busque um personagem...");

    const buttonElement = screen.getByRole("button", {
      name: /search/i,
    });

    fireEvent.change(textFild, { target: { value: "627" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Busque um personagem...")
      ).toBeTruthy();

      setTimeout(() => {
        expect(screen.getByTestId("character-container")).toHaveTextContent(
          "627"
        );
      }, 100);
    });
  });
});

describe("render error when character card when doing a survey", () => {
  it("should be error when character card when doing a survey", async () => {
    apiMock.onGet("/characters").reply(200, fakeCharacter);
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Search />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    const textFild = screen.getByPlaceholderText("Busque um personagem...");

    const buttonElement = screen.getByRole("button", {
      name: /search/i,
    });

    fireEvent.change(textFild, { target: { value: "test" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Busque um personagem...")
      ).toBeTruthy();

      setTimeout(() => {
        expect(screen.getByTestId("character-container")).not.toHaveTextContent(
          "test"
        );
      }, 100);
    });
  });
});
