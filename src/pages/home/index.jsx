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

  const [dataCard, setDataCard] = useState(null);
  const [pageNext, setPageNext] = useState(50);
  const [open, setOpen] = useState(false);

  let currentPage = 50;

  const fakeArray = Array.from(Array(currentPage));
  const isMobile = useMediaQuery("(max-width: 600px");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openModal = (item) => {
    handleOpen();
    setDataCard(item);
  };

  console.log(pageNext - currentPage, pageNext);

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
              xxs: "1",
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
              xxs: "1",
              xs: "2",
              sm: "3",
              md: "4",
              lg: "5",
              xl: "6",
            },
          }}
        >
          {characters
            .slice(pageNext - currentPage, pageNext)
            .map((item, index) => {
              return (
                <CardBasic key={index} item={item} openModal={openModal} />
              );
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
          onChange={(event, value) => {
            setPageNext(value * currentPage);
            window.scrollTo(0, 0);
          }}
          color="secondary"
          siblingCount={isMobile ? 0 : 2}
        />
      </Box>
      <BasicModal open={open} handleClose={handleClose} dataCard={dataCard} />
    </Container>
  );
}
