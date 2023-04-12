import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState,useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
export default function MediaControlCard() {
  const theme = useTheme();
  const [total, setTotal] = useState(200);
  const [count, setCount] = useState(0);
  const price = 200
  useEffect(() => {
    setTotal(count * price);
  }, [count, price]);
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 160 }}
        image="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/30/1173675/Pinkvenom-Jisoo-6.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            Live From Space
          </Typography>
          <Box display="flex" alignItems="center">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <Typography>{count}</Typography>
            <Button onClick={() => setCount(count + 1) }>+</Button>
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ float: "left" }}
            color="#33333"
            component="div"
          >
            Total: {total}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
      <ClearIcon sx={{ cursor: "pointer" }} />
    </Card>
  );
}
