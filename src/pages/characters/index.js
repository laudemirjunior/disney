import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import api from "../../services";
import Monster from "../../assets/monster.png";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function Characters() {
  let { id } = useParams();
  const [oneCharacter, setOneCharacter] = useState(null);

  useEffect(() => {
    api
      .get(`/characters/${id}`)
      .then((response) => setOneCharacter(response.data))
      .catch((e) => setOneCharacter([]));
  }, []);

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
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "600px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={oneCharacter.imageUrl}
                  alt={oneCharacter.name}
                  loading="lazy"
                  style={{ width: "30vh" }}
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {oneCharacter.name}
                </Typography>
                {oneCharacter.films.length > 0 && (
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Filmes
                  </Typography>
                )}
                {oneCharacter.films.map((item) => (
                  <Typography id="modal-modal-description">{item}</Typography>
                ))}
                {oneCharacter.tvShows.length > 0 && (
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Series
                  </Typography>
                )}
                {oneCharacter.tvShows.map((item) => (
                  <Typography id="modal-modal-description">{item}</Typography>
                ))}
                {oneCharacter.videoGames.length > 0 && (
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Jogos
                  </Typography>
                )}
                {oneCharacter.videoGames.map((item) => (
                  <Typography id="modal-modal-description">{item}</Typography>
                ))}
              </Card>
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
