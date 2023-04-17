import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import { Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#C0C0C0",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
}));

function PolicyCM() {
  const policies = [
    {
      icon: <LocalShippingIcon />,
      title: "MIỄN PHÍ VẬN CHUYỂN",
      description: "CHO ĐƠN HÀNG TRÊN 200K",
    },
    {
      icon: <VerifiedUserIcon />,
      title: "60 NGÀY ĐỔI TRẢ",
      description: "VÌ BẤT KÌ LÝ DO GÌ",
    },
    {
      icon: <LocalOfferIcon />,
      title: "ĐẾN TẬN NƠI NHẬN HÀNG TRẢ",
      description: "HOÀN TIỀN TRONG 24H",
    },
    {
      icon: <StarIcon />,
      title: "TỰ HÀO SẢN XUẤT",
      description: "TẠI VIỆT NAM",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {policies.map((policy, index) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
            <Item>
              {policy.icon}
              <Typography variant="p">
                {policy.title}
                <br />
                {policy.description}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PolicyCM;
