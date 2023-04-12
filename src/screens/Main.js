import React from "react";
import FooterCM from "../component/Home/components/Footer/FooterCM";
import { Container } from "@mui/material";
import Home from "../component/Home/Home";
import ResponsiveAppBar from "../component/Home/components/Appbar/ResponsiveAppBar";
import SlideImage from "../component/Home/components/Carousel/SlideImage";

function Main() {
  return (
    <>
      <ResponsiveAppBar />
      <SlideImage />
      <Home />
      <FooterCM />
    </>
  );
}

export default Main;
