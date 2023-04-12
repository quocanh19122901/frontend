import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Paper } from "@mui/material";
import "./Aboutus.css";
const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom:"10px"
}));

function AboutUs() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Item>
            <img
              src="https://mcdn.coolmate.me/image/March2023/mceclip0_26.jpg"
              alt=""
              style={{width:"100%"}}
              
            />
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Item>
            <img
              src="https://mcdn.coolmate.me/image/March2023/mceclip1_16.jpg"
              alt=""
            />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutUs;
