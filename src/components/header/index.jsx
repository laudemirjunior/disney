import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { InitialDataContext } from "../../context/initialContext";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Tooltip } from "@mui/material";

import Disney from "../../assets/disney.png";

export default function Header() {
  const { search } = useContext(InitialDataContext);
  const [valueInput, setValueInput] = useState("");
  const [open, setOpen] = useState(false);

  let history = useHistory();

  const searchCharacter = (e) => {
    if (valueInput.length < 3) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    } else {
      search(valueInput);
      e.preventDefault();
      history.push("/search");
    }
  };

  return (
    <>
      <AppBar color="secondary">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Tooltip title="Clique aqui para ir para home" placement="bottom">
              <img
                src={Disney}
                alt="disney"
                style={{
                  width: "100px",
                  cursor: "pointer",
                  margin: " 0 20px -10px 0",
                }}
                onClick={() => history.push("/")}
              />
            </Tooltip>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Busque um personagem..."
                onChange={(e) => setValueInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchCharacter(e);
                  }
                }}
              />
              <IconButton
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={(e) => {
                  searchCharacter(e);
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Toolbar>
        </Container>
      </AppBar>
      {open && (
        <Alert
          severity="error"
          sx={{
            position: "absolute",
            top: "75px",
            right: "10px",
          }}
        >
          <AlertTitle>Info</AlertTitle>
          <strong>Sua pesquisa deve conter no mínimo 3 caracteres!</strong>
        </Alert>
      )}
    </>
  );
}
