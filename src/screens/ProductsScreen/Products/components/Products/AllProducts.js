import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import CustomSeparator from "./CustomSeparator";
import SearchBar from "components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tag } from "antd";
import CategoryMenu from "./CategoryMenu";
const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function AllProducts() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          key: item._id,
        }));
        setData(modifiedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          key: item._id,
        }));
        setCategory(modifiedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = () => {
    axios
      .get(
        `http://localhost:5000/api/products/search?productName=${searchTerm}`
      )
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          key: item._id,
        }));

        setData(modifiedData);
        if (modifiedData.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const ProductCategory = (id) => {
  //   axios
  //     .get(`http://localhost:5000/api/products/category/${id}`)
  //     .then((response) => {
  //       const modifiedData = response.data.map((item) => ({
  //         ...item,
  //         key: item._id,
  //       }));
  //       setData(modifiedData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <Container maxWidth="lg">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <CategoryMenu setData={setData} />
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 15 }}
      >
        {notFound ? (
          <Box sx={{ minHeight: "650px" }}>
            <Typography
              variant="h3"
              sx={{
                width: "100%",
                fontFamily: "Monospace",
                lineHeight: "650px",
                padding: "0 auto",
              }}
            >
              Không có sản phẩm phù hợp
            </Typography>
          </Box>
        ) : data && data.length > 0 ? (
          data?.map((item, index) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Link to={`/products/${item._id}`} key={index}>
                <Item>
                  <Box>
                    <Card sx={{ maxWidth: 450, minHeight: 500 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={item.avatar}
                          alt="clothes"
                          sx={{ height: 400 }}
                        />
                        <CardContent
                          sx={{
                            height: "150px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                          }}
                        >
                          <Typography gutterBottom variant="h6" component="div">
                            {item.title}
                          </Typography>
                          <Typography variant="body3" color="text.secondary">
                            {item.SubCategoryId.SubCategoryName}
                          </Typography>
                          {item.status === "Đang bày bán" ? (
                            <Tag
                              color="green"
                              style={{ textAlign: "center", fontSize: "15px" }}
                            >
                              Giá: {item.price.toLocaleString("vi-VN")}đ
                            </Tag>
                          ) : (
                            <Tag
                              color="grey"
                              style={{ textAlign: "center", fontSize: "15px" }}
                            >
                              Đã ngừng kinh doanh
                            </Tag>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Box>
                </Item>
              </Link>
            </Grid>
          ))
        ) : (
          <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
            <Item>
              <Box>
                {/* Skeleton cho hình ảnh */}
                <Skeleton variant="rectangular" sx={{ height: 300 }} />

                <CardContent
                  sx={{
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  {/* Skeleton cho tiêu đề */}
                  <Skeleton variant="text" width="80%" />

                  {/* Skeleton cho tên danh mục */}
                  <Skeleton variant="text" width="60%" />

                  {/* Skeleton cho giá */}
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Box>
            </Item>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
