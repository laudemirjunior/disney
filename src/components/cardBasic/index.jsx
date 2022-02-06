import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

export default function CardBasic({ item, func }) {
  return (
    <Card elevation={6} sx={{ minHeight: "100px" }}>
      <img
        src={item.imageUrl}
        alt={item.name}
        loading="lazy"
        style={{ width: "100%" }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontSize: "18px" }}>
          {item.name}
        </Typography>
      </CardContent>
      <CardActions variant="secondary">
        <Tooltip title="Clique para saber mais" placement="bottom">
          <Button
            sx={{ margin: "auto" }}
            variant="outlined"
            onClick={() => func(item)}
          >
            Veja mais
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
