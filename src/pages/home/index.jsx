import React, { useState, useEffect } from "react";
import { useInitialDataContext } from "../../context/initialContext";
import BasicModal from "../../components/modal";

import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardBasic from "../../components/cardBasic";
import Header from "../../components/header";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { useMediaQuery } from "@mui/material";

export default function Home() {
  const { characters } = useInitialDataContext();
  const [sliceCharacters, setSliceCharacters] = useState([])
  const [open, setOpen] = useState(false);
  const [dataCard, setDataCard] = useState(null);
  const [pagePrev, setPagePrev] = useState(1);
  const [pageNext, setPageNext] = useState(50);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let currentPage = 50;
  const fakeArray = Array.from(Array(currentPage));
  const isMobile = useMediaQuery("(max-width: 600px");

  const func = (item) => {
    handleOpen();
    setDataCard(item);
  };

  const pagination = (item, page) => {
    if (pagePrev < page || pagePrev > page) {
      setPageNext(pageNext * page);
    } else {
    setPagePrev(page);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setSliceCharacters(characters.slice(pageNext - currentPage, pageNext))
  }, [pageNext])

  return (
    <Container
      maxWidth="xl"
      style={{ marginTop: "90px" }}
      data-testid="character-container"
    >
      <Header />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          textAlign: "center",
          margin: "30px 0",
        }}
      >
        Todos os personagens
      </Typography>
      {characters.length === 0 ? (
        <Box
          sx={{
            columnCount: {
              xs: "2",
              sm: "3",
              md: "4",
              lg: "5",
              xl: "6",
            },
          }}
        >
          {fakeArray.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  minHeight: "100px",
                  display: "inline-block",
                  margin: "10px 0",
                  width: "100%",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={200 * Math.random() + 150}
                />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            columnCount: {
              xs: "2",
              sm: "3",
              md: "4",
              lg: "5",
              xl: "6",
            },
          }}
        >
          {sliceCharacters
            .map((item, index) => {
              return <CardBasic key={index} item={item} func={func} />;
            })}
        </Box>
      )}
      <Box
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px 0",
        }}
      >
        <Pagination
          count={Math.ceil(characters.length / currentPage)}
          size={isMobile ? "medium" : "large"}
          onChange={(event, value) => pagination(event, value)}
          color="secondary"
          siblingCount={isMobile ? 0 : 2}
        />
      </Box>
      <BasicModal open={open} handleClose={handleClose} dataCard={dataCard} />
    </Container>
  );
}
