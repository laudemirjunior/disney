import React from "react";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "../../pages/home";
import MockAdapter from "axios-mock-adapter";
const apiMock = new MockAdapter(axios);

describe("render a character card", () => {
  it("should be able to render a character card", async () => {
    apiMock.onGet("/characters").replyOnce(200, [
      {
        _id: 10,
        films: [],
        shortFilms: [],
        tvShows: ["Lilo & Stitch: The Series", "Stitch!"],
        videoGames: ["Disney Tsum Tsum (game)"],
        parkAttractions: [],
        allies: [],
        enemies: [],
        name: "627",
        imageUrl:
          "https://static.wikia.nocookie.net/disney/images/8/80/Profile_-_627.png",
        url: "https://api.disneyapi.dev/characters/10",
      },
    ]);
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Home />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );
    const card = screen.getByTestId("character-container");

    await waitFor(() => {
      expect(card).toHaveTextContent("627");
    });
  });
});

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("render error a character card", () => {
  it("should be error able to render a character card", async () => {
    apiMock.onGet("/characters").replyOnce(200, [
      {
        _id: 10,
        films: [],
        shortFilms: [],
        tvShows: ["Lilo & Stitch: The Series", "Stitch!"],
        videoGames: ["Disney Tsum Tsum (game)"],
        parkAttractions: [],
        allies: [],
        enemies: [],
        name: "627",
        imageUrl:
          "https://static.wikia.nocookie.net/disney/images/8/80/Profile_-_627.png",
        url: "https://api.disneyapi.dev/characters/10",
      },
    ]);
    render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Home />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );
    const card = screen.getByTestId("character-container");

    await waitFor(() => {
      expect(card).not.toHaveTextContent("6275");
    });
  });
});