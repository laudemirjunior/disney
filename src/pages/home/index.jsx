import React, { useState } from "react";
import { useInitialDataContext } from "../../context/initialContext";
import BasicModal from "../../components/modal";

import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardBasic from "../../components/cardBasic";
import Header from "../../components/header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function Home() {
  const { characters } = useInitialDataContext();
  const [open, setOpen] = useState(false);
  const [dataCard, setDataCard] = useState(null);
  const [pagePrev, setPagePrev] = useState(1);
  const [pageNext, setPageNext] = useState(48);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let currentPage = 48;
  const fakeArray = Array.from(Array(currentPage));

  const func = (item) => {
    handleOpen();
    setDataCard(item);
  };

  const pagination = (event, page) => {
    if (pagePrev < page) {
      setPageNext(pageNext * page);
    } else if (pagePrev > page) {
      setPageNext(page * currentPage);
    }
    setPagePrev(page);
    window.scrollTo(0, 0);
  };

  return (
    <Container
      maxWidth="xl"
      style={{ marginTop: "100px" }}
      data-testid="character-container"
    >
      <Header />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          display: { xs: "none", sm: "block" },
          textAlign: "center",
          margin: "30px",
        }}
      >
        Todos os personagens
      </Typography>
      {characters.length === 0 ? (
        <Grid container columns={12} spacing={2}>
          {fakeArray.map((item, index) => {
            return (
              <Grid item key={index} xs={12} sm={6} md={3} lg={2}>
                <Skeleton
                  variant="rectangular"
                  height={200 * Math.random() + 150}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid container columns={12} spacing={2}>
          {characters
            .slice(pageNext - currentPage, pageNext)
            .map((item, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={3} lg={2}>
                  <CardBasic item={item} func={func} />
                </Grid>
              );
            })}
        </Grid>
      )}
      <Grid className="sentinel" />
      <BasicModal open={open} handleClose={handleClose} dataCard={dataCard} />
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        <Pagination
          count={Math.ceil(characters.length / currentPage)}
          size="large"
          onChange={(event, value) => pagination(event, value)}
          color="secondary"
        />
      </Stack>
    </Container>
  );
}
