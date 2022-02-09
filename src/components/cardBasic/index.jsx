import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";

export default function CardBasic({ item, openModal }) {
  return (
    <Card
      elevation={4}
      sx={{
        minHeight: "100px",
        display: "inline-block",
        margin: "10px 0",
        width: "100%",
      }}
    >
      <Box sx={{ minHeight: "100px" }}>
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          style={{ width: "100%" }}
        />
      </Box>

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
            onClick={() => openModal(item)}
          >
            Veja mais
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
