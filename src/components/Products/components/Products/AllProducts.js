import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CardProduct from "./CardProduct";
import CustomSeparator from "./CustomSeparator";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AllProducts() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const numPages = Math.ceil(20 / itemsPerPage);

  return (
    <Container maxWidth="xl">
      <CustomSeparator/>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 15, xl: 15 }}
        >
          {Array.from(Array(20))
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((_, index) => (
              <Grid xs={6} sm={4} md={3} lg={3} xl={3} key={index}>
                <Item>
                  <CardProduct />
                </Item>
              </Grid>
            ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={numPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
}
