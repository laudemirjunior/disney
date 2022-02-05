import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardBasic({ item, func }) {
  return (
    <Card>
      <img
        src={item.imageUrl}
        alt={item.name}
        loading="lazy"
        style={{ width: "100%" }}
      />
      <CardContent>
        <Typography gutterBottom variant="p" component="div">
          {item.name}
        </Typography>
      </CardContent>
      <CardActions variant="secondary">
        <Button onClick={() => func(item)}>Mais informações</Button>
      </CardActions>
    </Card>
  );
}
