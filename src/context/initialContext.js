import { createContext, useContext, useEffect, useState } from "react";
import api from "../services";

export const InitialDataContext = createContext();

export const InitialDataProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [dataCharacters, setDataCharacters] = useState(null);
  const [valuePage, setValuePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (valuePage <= totalPages) {
      api.get(`/characters?page=${valuePage}`).then((response) => {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.data,
        ]);
        setTotalPages(response.data.totalPages);
        setValuePage(valuePage + 1);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = (value) => {
    let newValue = value.toLowerCase().replace(/[\W+]/g, "");
    let newData = [];
    characters.forEach((item) => {
      if (
        item.films.some((item2) =>
          item2.toLowerCase().replace(/[\W+]/g, "").includes(newValue)
        ) === true ||
        item.tvShows.some((item2) =>
          item2.toLowerCase().replace(/[\W+]/g, "").includes(newValue)
        ) === true ||
        item.videoGames.some((item2) =>
          item2.toLowerCase().replace(/[\W+]/g, "").includes(newValue)
        ) === true ||
        item.name.toLowerCase().replace(/[\W+]/g, "").includes(newValue)
      ) {
        newData.push(item);
      }
    });
    setDataCharacters([]);
    return setDataCharacters(newData);
  };

  return (
    <InitialDataContext.Provider
      value={{
        characters,
        dataCharacters,
        search,
      }}
    >
      {children}
    </InitialDataContext.Provider>
  );
};

export const useInitialDataContext = () => useContext(InitialDataContext);
