import { Container } from "@mui/material";
import React from "react";

function Hastag() {
  return (
    <div
      style={{
        height: "5vw",
        backgroundColor: "#333333",
        margin: "30px 0px",
      }}
    >
      <Container maxWidth="xl">
        <h1
          style={{
            color: "white",
            fontFamily: "Helvetica",
            fontStyle: "italic",
            textAlign: "center",
            lineHeight: "5vw",
            fontSize: "4vw",
            letterSpacing: "5px",
          }}
        >
          #COOLMATE
        </h1>
      </Container>
    </div>
  );
}

export default Hastag;
