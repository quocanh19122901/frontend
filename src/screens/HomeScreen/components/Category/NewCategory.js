import * as React from "react";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Tag } from "antd";
import Title from "antd/es/typography/Title";
import "./styles.css";
import { Link } from "react-router-dom";
export default function NewCategory() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/top/alltime")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      });
  }, [setProducts]);
  return (
    <Container maxWidth="lg">
      <Title
        level={3}
        style={{ textAlign: "center", color: "#FF6600", fontStyle: "italic" }}
      >
        {" "}
        Sản phẩm bán chạy nhất
      </Title>
      <Box sx={{ width: "100%" }}>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
        >
          {products && products.length > 0
            ? products.map((item, index) => (
                <SwiperSlide key={index}>
                  <Card sx={{ maxWidth: 450, height: 500 }}>
                    <Link to={`/products/${item._id}`} key={index}>
                      <CardActionArea>
                        <img
                          src={item.avatar}
                          alt="clothes"
                          className="swiper-slide-image"
                        />
                        <CardContent
                          sx={{
                            height: "200px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                          }}
                        >
                          <Typography gutterBottom variant="h6" component="div">
                            {item.title}
                          </Typography>

                          {item.status === "Đang bày bán" ? (
                            <Tag
                              color="green"
                              style={{
                                textAlign: "center",
                                fontSize: "15px",
                              }}
                            >
                              Giá: {item.price.toLocaleString("vi-VN")}đ
                            </Tag>
                          ) : (
                            <Tag
                              color="grey"
                              style={{
                                textAlign: "center",
                                fontSize: "15px",
                              }}
                            >
                              Đã ngừng kinh doanh
                            </Tag>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </Box>
    </Container>
  );
}
