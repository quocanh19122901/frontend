import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Container } from "@mui/material";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  display: "grid", // Add display: flex
  placeItems: "center",
}));

function FooterCM() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "black",
        marginTop: "30px",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Item>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <List style={{ display: "flex", flexDirection: "column" }}>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Hỏi đáp - FAQs"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Chính sách đổi trả 60 ngày"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Liên hệ"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Chính sách khuyến mãi"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Chính sách giao hàng"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Chính sách bảo mật"}
                  </Link>
                </ListItem>
              </List>
            </Item>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Item>
              <Typography variant="h6" gutterBottom>
                Kiến thức mặc đẹp
              </Typography>
              <List
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Hướng dẫn chọn size"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Blog"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Group mặc đẹp sống chất"}
                  </Link>
                </ListItem>
              </List>
            </Item>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Item>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <List style={{ display: "flex", flexDirection: "column" }}>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Hỏi đáp - FAQs"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Chính sách đổi trả 60 ngày"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Liên hệ"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Chính sách khuyến mãi"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Chính sách giao hàng"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Chính sách bảo mật"}
                  </Link>
                </ListItem>
              </List>
            </Item>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Item>
              <Typography variant="h6" gutterBottom>
                Về COOLMATE
              </Typography>
              <List
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Câu chuyện về Coolmate"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Nhà máy"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"CoolClub"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link
                    color="white"
                    variant="subtitle2"
                    href="#"
                    underline="hover"
                  >
                    {"Care & Share"}
                  </Link>
                </ListItem>
              </List>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FooterCM;
