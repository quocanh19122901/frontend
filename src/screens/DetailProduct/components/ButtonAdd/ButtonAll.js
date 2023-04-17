import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "space-around",
}));

export default function ColumnsGrid() {
  const [count, setCount] = useState(0);
  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <Box>
      <Grid sx={{ alignItems: "center" }} container columns={12}>
        <Grid item xs={6}>
          <Item>
            <Box display="flex" alignItems="center">
              <Button onClick={handleDecrease}>-</Button>
              <Typography>{count}</Typography>
              <Button onClick={handleIncrease}>+</Button>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: " 0px 20px",
            }}
          >
            <Button>
              <LocalShippingIcon />
              <Typography
                variant="overline"
                sx={{ padding: "10px 0px 5px 10px" }}
              >
                Thêm vào giỏ hàng
              </Typography>
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
