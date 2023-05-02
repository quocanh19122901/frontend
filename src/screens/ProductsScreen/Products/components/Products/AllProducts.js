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

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function AllProducts() {
  const [data, setData] = useState([]);

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
  // const handleProductClick = (id) => {
  //   axios
  //     .get(`http://localhost:5000/api/products/${id}`)
  //     .then((response) => {
  //       // Do something with the response data
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <Container maxWidth="xl">
      <SearchBar />
      <CustomSeparator />
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 15, xl: 15 }}
      >
        {data && data.length > 0 ? (
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
                          // onClick={() => {
                          //   handleProductClick(item._id);
                          // }}
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
                            {item.productName}
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
          <Typography variant="h3">Loading data.... </Typography>
        )}
      </Grid>
    </Container>
  );
}
