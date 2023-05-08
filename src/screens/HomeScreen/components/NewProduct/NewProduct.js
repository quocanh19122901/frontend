import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "antd";
import { Container } from "@mui/material";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function NewProduct() {
  const products = [
    {
      imageUrl: "https://mcdn.coolmate.me/image/March2023/mceclip0_166.jpg",
      title: "84Rising*",
      description:
        "Thương hiệu thời trang dành riêng cho giới trẻ bởi Coolmate.",
    },
    {
      imageUrl: "https://mcdn.coolmate.me/image/March2023/mceclip3_13.jpg",
      title: "CM24*",
      description:
        "Thương hiệu thời trang dành riêng cho giới trẻ bởi Coolmate.",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid key={index} item xs={12} sm={12} md={6}>
            <Item style={{ position: "relative" }}>
              <img src={product.imageUrl} alt="" />
              <Box
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "4%",
                  height: "25%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  wordWrap: "break-word",
                }}
              >
                <Typography style={{ fontSize: "3em" }}>
                  {product.title}
                </Typography>
                <Typography
                  style={{ fontSize: "1.1em", paddingBottom: "10px" }}
                >
                  {product.description}
                </Typography>
                <Button variant="contained" href="/products">
                  See it !
                </Button>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NewProduct;
