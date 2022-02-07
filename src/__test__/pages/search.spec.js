import React from "react";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "../../pages/search";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
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
  it("should be able to render character card when doing a survey", () => {
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

    const placeholder = screen.getByPlaceholderText("Busque um personagem...");

    expect(placeholder).toBeTruthy();

    setTimeout(() => {
      const card = screen.getByTestId("character-container");

      expect(card).toHaveTextContent("627");
    }, 100);
  });
});

describe("render error when character card when doing a survey", () => {
  it("should be error when character card when doing a survey", async () => {
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

    const card = screen.getByTestId("character-container");

    await waitFor(() => {
      expect(card).not.toHaveTextContent("test");
    });
  });
});
