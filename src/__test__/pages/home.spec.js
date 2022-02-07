import React from "react";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "../../pages/home";
import MockAdapter from "axios-mock-adapter";
import fakeCharacter from "../mock/fakeCharacter";

const apiMock = new MockAdapter(axios);

describe("render a character card", () => {
  it("should be able to render a character card", async () => {
    apiMock.onGet("/characters").replyOnce(200, fakeCharacter);
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Home />}
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
    apiMock.onGet("/characters").replyOnce(200, fakeCharacter);
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Home />}
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
