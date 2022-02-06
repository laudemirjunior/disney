import React from "react";
import Header from "../../components/header";
import {
  InitialDataProvider,
  InitialDataContext,
} from "../../context/initialContext.js";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import api from "../../services";
// import Characters from "../../pages/characters";
// import MockAdapter from "axios-mock-adapter";

// const apiMock = new MockAdapter(api);

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
    const { getByText } = render(
      <InitialDataProvider>
        <InitialDataContext.Consumer>
          {(value) => <Header />}
        </InitialDataContext.Consumer>
      </InitialDataProvider>
    );

    expect(screen.getByPlaceholderText("Busque um personagem...")).toBeTruthy();
  });
});

describe("do a search", () => {
  it("should be able to to a search", async () => {
    const { getByText } = render(
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
    const { getByText } = render(
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

// describe("render a character card", () => {
//   it("should be able to render a character card", async () => {
//     apiMock.onGet("/characters/10").replyOnce(200, [
//       {
//         _id: 10,
//         films: [],
//         shortFilms: [],
//         tvShows: ["Lilo & Stitch: The Series", "Stitch!"],
//         videoGames: ["Disney Tsum Tsum (game)"],
//         parkAttractions: [],
//         allies: [],
//         enemies: [],
//         name: "627",
//         imageUrl:
//           "https://static.wikia.nocookie.net/disney/images/8/80/Profile_-_627.png",
//         url: "https://api.disneyapi.dev/characters/10",
//       },
//     ]);
//     render(<Characters />);

//     const card = screen.getByTestId("character-container");

//     await waitFor(() => {
//       expect(card).toHaveTextContent("627");
//     });
//   });
// });
