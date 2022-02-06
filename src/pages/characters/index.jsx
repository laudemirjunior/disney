import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services";
import Header from "../../components/header";

import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

import Monster from "../../assets/monster.png";

export default function Characters() {
  let { id } = useParams();
  const [oneCharacter, setOneCharacter] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px");

  useEffect(() => {
    api
      .get(`/characters/${id}`)
      .then((response) => setOneCharacter(response.data))
      .catch((e) => setOneCharacter([]));
  }, [id]);

  return (
    <Container maxWidth="xl">
      <Grid container style={{ marginTop: "70px" }} columns={12}>
        <Header />
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "70px",
          }}
        >
          {oneCharacter !== null ? (
            oneCharacter.length !== 0 ? (
              <Box
                data-testid="character-container"
                sx={{
                  width: "100%",
                  maxWidth: "600px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: () => (isMobile ? "center" : "none"),
                  flexDirection: () => (isMobile ? "column" : "row"),
                  gap: 5,
                }}
              >
                <Box>
                  <img
                    src={oneCharacter.imageUrl}
                    alt={oneCharacter.name}
                    loading="lazy"
                    style={{ width: "30vh" }}
                  />
                </Box>
                <Box>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {oneCharacter.name}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Filmes
                  </Typography>
                  {oneCharacter.films.length > 0 ? (
                    oneCharacter.films.map((item, index) => (
                      <Typography key={index}>{item}</Typography>
                    ))
                  ) : (
                    <Typography>Sem registros</Typography>
                  )}
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Curta-metragens
                  </Typography>
                  {oneCharacter.shortFilms.length > 0 ? (
                    oneCharacter.shortFilms.map((item, index) => (
                      <Typography key={index}>{item}</Typography>
                    ))
                  ) : (
                    <Typography>Sem registros</Typography>
                  )}
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Programas
                  </Typography>
                  {oneCharacter.tvShows.length > 0 ? (
                    oneCharacter.tvShows.map((item, index) => (
                      <Typography key={index}>{item}</Typography>
                    ))
                  ) : (
                    <Typography>Sem registros</Typography>
                  )}
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Jogos
                  </Typography>
                  {oneCharacter.videoGames.length > 0 ? (
                    oneCharacter.videoGames.map((item, index) => (
                      <Typography key={index}>{item}</Typography>
                    ))
                  ) : (
                    <Typography>Sem registros</Typography>
                  )}
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Parques temáticos
                  </Typography>
                  {oneCharacter.parkAttractions.length > 0 ? (
                    oneCharacter.parkAttractions.map((item, index) => (
                      <Typography key={index}>{item}</Typography>
                    ))
                  ) : (
                    <Typography>Sem registros</Typography>
                  )}
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Aliados
                  </Typography>
                  {oneCharacter.allies.length > 0 ? (
                    oneCharacter.allies.map((item, index) => (
                      <Typography key={index}>{item}</Typography>
                    ))
                  ) : (
                    <Typography>Sem registros</Typography>
                  )}
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Inimigos
                  </Typography>
                  {oneCharacter.enemies.length > 0 ? (
                    oneCharacter.enemies.map((item, index) => (
                      <Typography key={index}>{item}</Typography>
                    ))
                  ) : (
                    <Typography>Sem registros</Typography>
                  )}
                </Box>
              </Box>
            ) : (
              <Grid container columns={12}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItens: "center",
                    margin: "100px",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <img src={Monster} alt="monster" />
                    <h1>Not Found</h1>
                  </Box>
                </Grid>
              </Grid>
            )
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
