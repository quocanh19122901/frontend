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
          <Grid item xs={12} md={4} lg={4}>
            <Item>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <List style={{ display: "flex", flexDirection: "column" }}>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Hỏi đáp - FAQs"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Chính sách đổi trả 60 ngày"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Liên hệ"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Chính sách khuyến mãi"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Chính sách giao hàng"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Chính sách bảo mật"}
                  </Link>
                </ListItem>
              </List>
            </Item>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
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
                  <Link href="#" underline="none">
                    {"Hướng dẫn chọn size"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Blog"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Group mặc đẹp sống chất"}
                  </Link>
                </ListItem>
              </List>
            </Item>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
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
                  <Link href="#" underline="none">
                    {"Câu chuyện về Coolmate"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"Nhà máy"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
                    {"CoolClub"}
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="#" underline="none">
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
