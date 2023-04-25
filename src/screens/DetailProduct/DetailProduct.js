import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InforProduct from "./components/InforProduct/InforProduct";
import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ImageProducts.css";
import { Pagination, Navigation } from "swiper";
import { useParams } from "react-router-dom";
const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  color: theme.palette.text.secondary,
  margin: theme.spacing(3),
}));
export default function DetailProduct() {
  let params = useParams();

  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${params.id}`)
      .then((response) => {
        setImages(response.data.img);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <Box>
        <Grid container columnSpacing={{ xs: 2, sm: 2, md: 0, lg: 7 }}>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Item>
              <>
                <Swiper
                  pagination={{
                    type: "progressbar",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="Swiper"
                >
                  {images.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img src={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Item>
              <InforProduct />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
