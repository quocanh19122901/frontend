import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
  transition: "transform 0.2s ease-in-out",

  "&:hover": {
    transform: "scale(1.2)",
  },
}));

function NewCategory() {
  const categories = [
    {
      imageUrl: "https://mcdn.coolmate.me/image/April2023/mceclip0_54.png",
    },
    {
      imageUrl: "https://mcdn.coolmate.me/image/April2023/mceclip1_33.png",
    },
    {
      imageUrl: "https://mcdn.coolmate.me/image/April2023/mceclip2_97.png",
    },
    {
      imageUrl: "https://mcdn.coolmate.me/image/April2023/mceclip4_87.png",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%" }}>
        <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
          {categories.map((category, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Item>
                <img src={category.imageUrl} alt="Category images" />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
export default NewCategory;
