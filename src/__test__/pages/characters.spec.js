import React from "react";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Characters from "../../pages/characters";
import MockAdapter from "axios-mock-adapter";
import fakeCharacter from "../mock/fakeCharacter";

const apiMock = new MockAdapter(axios);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 10,
  }),
}));

describe("render a character card", () => {
  it("should be able to render a character card", async () => {
    apiMock.onGet("/characters").reply(200, fakeCharacter);
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Characters />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("character-container")).toHaveTextContent(
        "627"
      );
    });
  });
});

describe("render error a character card", () => {
  it("should be error able to render a character card", async () => {
    apiMock.onGet("/characters").reply(200, fakeCharacter);

    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Characters />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("character-container")).not.toHaveTextContent(
        "pokemon"
      );
    });
  });
});
