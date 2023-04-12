import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardProduct() {
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/December2022/Quan_Jogger_Nam_tui_hop_Cargo_Outdoor_-_Xam_-_2D.jpg"
          alt="clothes"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Lizard
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Lizards
          </Typography>
          <Typography>
            Price: 200.000đ
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
