import React, { useContext, useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { InitialDataContext } from "../../context/initialContext";

export default function Header() {
  const { search } = useContext(InitialDataContext);
  const [valueInput, setValueInput] = useState("");
  let history = useHistory();

  const searchCharacter = (e) => {
    search(valueInput);
    e.preventDefault();
    history.push("/search");
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            onClick={() => history.push("/")}
            sx={{ cursor: "pointer" }}
          >
            Disney
          </Typography>
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
              placeholder="Search..."
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
  );
}
