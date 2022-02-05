import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BasicModal from "../../components/modal";
import { useInitialDataContext } from "../../context/initialContext";
import CardBasic from "../../components/cardBasic";
import Header from "../../components/header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Home() {
  const { characters, totalPages } = useInitialDataContext();
  const [open, setOpen] = useState(false);
  const [dataCard, setDataCard] = useState(null);
  const [pagePrev, setPagePrev] = useState(1);
  const [pageNext, setPageNext] = useState(48);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let currentPage = 48;

  // const [currentPage, setCurrentPage] = useState(0);
  // useEffect(() => {
  //   const intersectionObserver = new IntersectionObserver((entries) => {
  //     if (entries.some((entry) => entry.isIntersecting)) {
  //       setCurrentPage((currentValue) => currentValue + 40);
  //     }
  //   });
  //   intersectionObserver.observe(document.querySelector(".sentinel"));
  //   return () => intersectionObserver.disconnect();
  // }, []);

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
    <Container maxWidth="xl" style={{ marginTop: "100px" }}>
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
      {characters === [] ? (
        <CircularProgress />
      ) : (
        <Grid container columns={12} spacing={2}>
          {characters
            .slice(pageNext - currentPage, pageNext)
            .map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={3} lg={2}>
                  <CardBasic item={item} key={index} func={func} />
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
        />
      </Stack>
    </Container>
  );
}
