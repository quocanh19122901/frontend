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
  Chip,
  Container,
  Typography,
} from "@mui/material";
import CustomSeparator from "./CustomSeparator";
import SearchBar from "components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tag } from "antd";
import { deburr } from "lodash";
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

  const filteredData = data.filter((item) =>
    deburr(item.productName)
      .toLowerCase()
      .includes(deburr(searchTerm).toLowerCase())
  );

  console.log(filteredData);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          key: item._id,
        }));
        console.log(modifiedData);
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
        console.log(modifiedData);
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
  const ProductCategory = (id) => {
    axios
      .get(`http://localhost:5000/api/products/category/${id}`)
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
  };
  return (
    <Container maxWidth="xl">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 15, sm: 15, md: 15, lg: 15, xl: 15 }}
      >
        {category && category.length > 0
          ? category?.map((item, index) => (
              <Grid
                key={index}
                xs={3}
                sm={3}
                md={3}
                lg={3}
                sx={{ textAlign: "center", marginBottom: 5 }}
              >
                <Chip
                  onClick={() => ProductCategory(item._id)}
                  label={item.CategoryName}
                  sx={{
                    width: 200,
                    fontFamily: "monospace",
                    fontSize: 20,
                    fontWeight: "bold",
                    border: " 1px solid grey ",
                  }}
                  variant="filled"
                  clickable
                />
              </Grid>
            ))
          : ""}
      </Grid>
      <CustomSeparator />
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 15 }}
      >
        {notFound ? (
          <Box sx={{ minHeight: "650px" }}>
            <Typography variant="h3">Không có sản phẩm phù hợp </Typography>
          </Box>
        ) : data && data.length > 0 ? (
          data?.map((item, index) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Link to={`/products/${item._id}`} key={index}>
                <Item>
                  <Box>
                    <Card sx={{ maxWidth: 450, height: 500 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={item.avatar}
                          alt="clothes"
                          sx={{ height: 300 }}
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
                          <Typography variant="body3" color="text.secondary">
                            {item.CategoryId.CategoryName}
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
          <Typography
            sx={{
              height: 420,
              margin: "auto",
              lineHeight: "420px",
              fontFamily: "Helvet",
              fontSize: "30px",
            }}
          >
            Chưa có sản phẩm nào{" "}
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
