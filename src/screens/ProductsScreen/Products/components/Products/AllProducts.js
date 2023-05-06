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
  const [searchResults, setSearchResults] = useState([]);
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
        setSearchResults(modifiedData);
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
        columns={{ xs: 12, sm: 12, md: 12, lg: 15, xl: 15 }}
      >
        {category && category.length > 0
          ? category?.map((item, index) => (
              <Grid
                key={index}
                xs={3}
                sm={3}
                md={3}
                lg={3.75}
                sx={{ textAlign: "center", marginBottom: 5 }}
              >
                <Chip
                  onClick={() => ProductCategory(item._id)}
                  label={item.CategoryName}
                  sx={{
                    width: 200,
                    fontFamily: "fantasy",
                    fontSize: 20,
                    border: " 1px solid black ",
                  }}
                  variant="outlined"
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
        columns={{ xs: 12, sm: 12, md: 12, lg: 15, xl: 15 }}
      >
        {notFound ? (
          <Box sx={{ minHeight: "650px" }}>
            <Typography variant="h3">Không có sản phẩm phù hợp </Typography>
          </Box>
        ) : data && data.length > 0 ? (
          data?.map((item, index) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={4} xl={3}>
              <Link to={`/products/${item._id}`} key={index}>
                <Item>
                  <Box>
                    <Card sx={{ maxWidth: 450 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="400"
                          image={item.avatar}
                          alt="clothes"
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
                          <Typography>Giá: {item.price}đ</Typography>
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
