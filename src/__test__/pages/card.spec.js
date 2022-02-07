import React from "react";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import Characters from "../../pages/characters";
import MockAdapter from "axios-mock-adapter";
const apiMock = new MockAdapter(axios);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 10,
  }),
}));

describe("render a character card", () => {
  it("should be able to render a character card", async () => {
    apiMock.onGet("/characters").reply(200, [
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
          {(value) => <Characters />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );
    const card = screen.getByTestId("character-container");

    await waitFor(() => {
      expect(card).toHaveTextContent("627");
    });
  });
});

describe("render error a character card", () => {
  it("should be error able to render a character card", async () => {
    apiMock.onGet("/characters").reply(200, [
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
          {(value) => <Characters />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );
    const card = screen.getByTestId("character-container");

    await waitFor(() => {
      expect(card).not.toHaveTextContent("6275");
    });
  });
});
