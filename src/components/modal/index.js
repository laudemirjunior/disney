import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxHeight: "70%",
  overflow: "auto",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function BasicModal({ open, handleClose, dataCard }) {
  return (
    <div>
      {dataCard !== null && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <Avatar
                alt="Cindy Baker"
                src={dataCard.imageUrl}
                sx={{ width: 74, height: 74 }}
              />
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {dataCard.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "column",
                marginTop: 1,
              }}
            >
              {dataCard.films.length > 0 && (
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Filmes
                </Typography>
              )}
              {dataCard.films.map((item) => (
                <Typography id="modal-modal-description">{item}</Typography>
              ))}
              {dataCard.tvShows.length > 0 && (
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Series
                </Typography>
              )}
              {dataCard.tvShows.map((item) => (
                <Typography id="modal-modal-description">{item}</Typography>
              ))}
              {dataCard.videoGames.length > 0 && (
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Jogos
                </Typography>
              )}
              {dataCard.videoGames.map((item) => (
                <Typography id="modal-modal-description">{item}</Typography>
              ))}
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
}
