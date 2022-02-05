import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardDetails({ item, func }) {
  return (
    <Card>
      <img
        src={item.imageUrl}
        alt={item.name}
        loading="lazy"
        style={{ width: "100%" }}
      />
      <div style={{ maxHeight: "300px", overflow: "auto" }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {item.name}
        </Typography>
        {item.films.length > 0 && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filmes
          </Typography>
        )}
        {item.films.map((item) => (
          <Typography id="modal-modal-description">{item}</Typography>
        ))}
        {item.tvShows.length > 0 && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Series
          </Typography>
        )}
        {item.tvShows.map((item) => (
          <Typography id="modal-modal-description">{item}</Typography>
        ))}
        {item.videoGames.length > 0 && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Jogos
          </Typography>
        )}
        {item.videoGames.map((item) => (
          <Typography id="modal-modal-description">{item}</Typography>
        ))}
      </div>
    </Card>
  );
}
