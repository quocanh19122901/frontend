import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Highcharts from "highcharts";
import DownloadIcon from "@mui/icons-material/Download";
import HighchartsReact from "highcharts-react-official";
import json2csv from "json2csv";
import fileDownload from "js-file-download";
import { Buffer } from "buffer";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Title from "antd/es/typography/Title";

export default function Statistics() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const token = getCookie("access_Token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUser(response.data.length);
        console.log(response.data.length);
      });
  }, [setData]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/order/income", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data.monthlyData);
        console.log(response.data.monthlyData);
      });
  }, [setData]);

  const chartData = data.map((item) => [item._id, item.total]);
  console.log(chartData);
  const chartDataOrder = data.map((item) => [item._id, item.count]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/top/bestselling", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      });
  }, [setData]);

  const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalOrder = data.reduce((acc, curr) => acc + curr.count, 0);
  const exportCSV = () => {
    // const fields = ["year", "month", "revenue"];
    // const opts = { fields };
    const csvData = json2csv.parse(chartData, null);
    const csvBuffer = Buffer.from(csvData, "utf-8");
    fileDownload(csvBuffer, "revenue.csv");
  };
  const options = {
    title: {
      text: "Doanh thu theo tháng",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Tháng",
      },
    },
    yAxis: {
      title: {
        text: "Doanh thu",
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: chartData,
      },
    ],
  };
  const option1 = {
    title: {
      text: "Số lượng đơn hàng theo tháng",
    },
    xAxis: {
      type: "category",

      title: {
        text: "Tháng",
      },
    },
    yAxis: {
      tickInterval: 1,
      title: {
        text: "Số lượng đơn hàng",
      },
    },
    series: [
      {
        name: "Đơn hàng",
        data: chartDataOrder,
      },
    ],
  };
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={24}>
          <Grid item xs={8}>
            <Item sx={{ color: "blue" }}>
              <ShoppingBagIcon />
              <Typography>Tổng số đơn hàng</Typography>
              <Typography variant="h3">{totalOrder}</Typography>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item sx={{ color: "green" }}>
              <MonetizationOnIcon />
              <Typography>Tổng số doanh thu</Typography>
              <Typography variant="h3">
                {totalRevenue.toLocaleString("vi-VN")}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item sx={{ color: "purple" }}>
              <SupervisorAccountIcon />
              <Typography>Số lượng người dùng</Typography>
              <Typography variant="h3">{user}</Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box sx={{ padding: "2rem", backgroundColor: "white" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5"> Thống kê doanh thu</Typography>
                <Tooltip title="Xuất doanh thu" arrow placement="top">
                  <Button
                    onClick={exportCSV}
                    sx={{
                      "&.MuiButtonBase-root": {
                        minWidth: "40px",
                        "& .MuiButton-startIcon": {
                          margin: 0,
                        },
                      },
                    }}
                    startIcon={<DownloadIcon />}
                  ></Button>
                </Tooltip>
              </Box>
              <Box>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                  // style={{ height: "100%" }}
                />
              </Box>
              <Box>
                <Typography variant="h5"> Thống kê đơn hàng</Typography>
              </Box>
              <Box>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={option1}
                  // style={{ height: "100%" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ padding: "2rem", backgroundColor: "white" }}>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", m: "1rem 0" }}
              >
                Sản phẩm bán chạy trong tháng
              </Typography>
              <Box>
                <Box sx={{ height: "770px", overflowY: "hidden" }}>
                  {products && products.length > 0 ? (
                    products.map((item, index) => (
                      <Grid item xs={16} key={index}>
                        <ListItem key={index} disablePadding>
                          <ListItemButton>
                            <Card
                              sx={{
                                display: "flex",

                                height: "150px",
                              }}
                            >
                              <Box>
                                <CardMedia
                                  component="img"
                                  sx={{ width: 150 }}
                                  image={item.productDetails.avatar}
                                  alt="Live from space album cover"
                                />
                              </Box>
                              <Box>
                                <CardContent
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "grid",
                                    flexDirection: "column",
                                    placeItems: "center",
                                  }}
                                >
                                  <Box>
                                    <Typography component="div">
                                      {item.productDetails.title}
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                      <Typography>
                                        Đã bán: {item.totalSold}
                                      </Typography>
                                    </Box>

                                    <Typography
                                      variant="subtitle2"
                                      sx={{ float: "left" }}
                                      color="#33333"
                                      component="div"
                                    >
                                      Giá:{" "}
                                      {item.productDetails.price.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      đ
                                    </Typography>
                                  </Box>
                                </CardContent>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    pl: 1,
                                    pb: 1,
                                  }}
                                ></Box>
                              </Box>
                            </Card>
                          </ListItemButton>
                        </ListItem>
                      </Grid>
                    ))
                  ) : (
                    <Typography align="center">
                      Chưa bán được sản phẩm nào
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
