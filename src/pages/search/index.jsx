import React, { useEffect, useState } from "react";
import { useInitialDataContext } from "../../context/initialContext";
import Header from "../../components/header";

import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardDetails from "../../components/cardDetails";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

import Fish from "../../assets/fish.png";
import Mickey from "../../assets/mickey.png";

export default function Search() {
  const { dataCharacters } = useInitialDataContext();
  const [currentPage, setCurrentPage] = useState(0);
  let history = useHistory();

  const func = (id) => {
    history.push(`/characters/${id._id}`);
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentValue) => currentValue + 24);
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinel"));
    return () => intersectionObserver.disconnect();
  }, []);

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
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          margin: "100px 0",
        }}
      >
        Personagens pesquisados
      </Typography>
      {dataCharacters !== null ? (
        dataCharacters.length > 0 ? (
          <Grid
            container
            columns={10}
            spacing={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItens: "center",
            }}
          >
            {dataCharacters.slice(0, currentPage).map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <CardDetails item={item} key={index} func={func} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid container columns={12}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItens: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <img src={Fish} alt="fish" style={{ height: "300px" }} />
                <Typography variant="h5">
                  O personagem pesquisado não foi encontrado!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )
      ) : (
        <Grid container columns={12}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItens: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <img src={Mickey} alt="mickey" style={{ width: "300px" }} />
              <Typography variant="h5">Realize uma pesquisa!</Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      <div id="sentinel"></div>
    </Container>
  );
}
