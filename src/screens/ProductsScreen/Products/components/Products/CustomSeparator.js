import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

export default function CustomSeparator() {
  const navigate = useNavigate();
  function handleClick(event) {
    event.preventDefault();
    navigate("/products");
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="7B68EE"
      href="/"
      onClick={handleClick}
    >
      Sản phẩm
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="#7B68EE"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Tất cả sản phẩm
    </Link>,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}
