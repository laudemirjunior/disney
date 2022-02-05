import React from "react";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useInitialDataContext } from "../../context/initialContext";
import Header from "../../components/header";
import CardDetails from "../../components/cardDetails";
import { useHistory } from "react-router-dom";
import Fish from "../../assets/fish.png";
import Box from "@mui/material/Box";

export default function Search() {
  const { dataCharacters } = useInitialDataContext();
  let history = useHistory();

  const func = (id) => {
    history.push(`/characters/${id._id}`);
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl" style={{ marginTop: "100px" }}>
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
          Personagens pesquisados
        </Typography>
        {dataCharacters !== null ? (
          dataCharacters.length > 0 ? (
            <Grid container columns={16} spacing={5}>
              {dataCharacters.map((item, index) => {
                return (
                  <Grid item xs={16} sm={8} md={5} lg={3}>
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
                  margin: "100px",
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <img src={Fish} alt="fish" style={{ width: "200px" }} />
                  <h1>Not Found</h1>
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
                margin: "100px",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <h1>Realize uma pesquisa</h1>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
