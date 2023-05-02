import {
  Autocomplete,
  Box,
  Button,
  Container,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { WithContext as ReactTags } from "react-tag-input";
import "./style.css";

export default function AddProduct() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState([]);
  const [name, setName] = useState("");
  const [descs, setDescs] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [price, setPrice] = useState([]);
  const options = category.map((item) => ({
    name: item.CategoryName,
    id: item._id,
  }));
  const handleAdditionColor = (color) => {
    setColors([...colors, color]);
  };
  const handleAdditionSize = (size) => {
    setSizes([...sizes, size]);
  };
  const handleAdditionDesc = (desc) => {
    setDescs([...descs, desc]);
  };
  const handleAdditionImg = (img) => {
    setImgs([...imgs, img]);
  };
  const handleDeleteColor = (i) => {
    const newColors = colors.slice(0);
    newColors.splice(i, 1);
    setColors(newColors);
  };
  const handleDeleteSize = (i) => {
    const newSizes = sizes.slice(0);
    newSizes.splice(i, 1);

    setSizes(newSizes);
  };
  const handleDeleteDesc = (i) => {
    const newDescs = descs.slice(0);
    newDescs.splice(i, 1);
  };
  const handleDeleteImg = (i) => {
    const newImgs = imgs.slice(0);
    newImgs.splice(i, 1);

    setImgs(newImgs);
  };
  let params = useParams();

  const handleAccept = async () => {
    axios
      .post(`http://localhost:5000/api/products`, {
        title: title,
        productName: name,
        CategoryId: categoryId,
        desc: descs,
        avatar: avatar,
        img: imgs,
        quantity: quantity,
        size: sizes,
        color: colors,
        price: price,
      })
      .then((response) => {
        toast.success("Thêm sản phẩm thành công");
        setData(response.data);
      })
      .catch((error) => {
        toast.error("Vui lòng điền đầy đủ thông tin");
      });
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleProductNameChange = (event) => {
    setName(event.target.value);
  };

  //   const handleSizeChange = (event) => {
  //     setSize(event.target.value);
  //   };

  //   const handleColorChange = (event) => {
  //     setColor(event.target.value);
  //   };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };
  const handleCateChange = (value) => {
    const selectedCategory = category.find(
      (item) => item.CategoryName === value
    );
    setCategoryId(selectedCategory._id);
    setSelectedCategory(selectedCategory.CategoryName);
  };
  const handleSubCateChange = (event, value) => {
    setSelectedSubCategory(value);
  };
  //   const handleDescChange = (event) => {
  //     setDesc(event.target.value);
  //   };

  //   const handleImgChange = (event) => {
  //     setImg(event.target.value);
  //   };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }
    const token = getCookie("access_Token");
    axios
      .get("http://localhost:5000/api/category", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCategory(response.data);
        // console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [setCategory]);
  useEffect(() => {
    if (categoryId) {
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return parts.pop().split(";").shift();
        }
      }
      const token = getCookie("access_Token");
      axios
        .get(`http://localhost:5000/api/category/${categoryId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setSubCategory(response.data.SubCategory);
          //   console.log(response.data.SubCategory);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categoryId]);

  return (
    <Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Tiêu đề</TableCell>
            <TableCell>
              <TextField
                value={data.title}
                onChange={(event) => handleChangeTitle(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>
              <TextField
                onChange={(event) => handleProductNameChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={category.map((item) => item.CategoryName)}
                sx={{ width: 300 }}
                onChange={(e, value) => handleCateChange(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sub Category</TableCell>
            <TableCell>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={subCategory.map((item) => item.SubCategoryName)}
                sx={{ width: 300 }}
                onChange={handleSubCateChange}
                renderInput={(params) => (
                  <TextField {...params} label="Sub Category" />
                )}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mô tả</TableCell>
            <TableCell>
              <ReactTags
                tags={descs}
                handleAddition={handleAdditionDesc}
                handleDelete={handleDeleteDesc}
                placeholder="Add desc..."
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Màu sắc</TableCell>
            <TableCell>
              <ReactTags
                tags={colors}
                handleAddition={handleAdditionColor}
                handleDelete={handleDeleteColor}
                placeholder="Add color..."
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kích cỡ</TableCell>
            <TableCell>
              <ReactTags
                tags={sizes}
                handleAddition={handleAdditionSize}
                handleDelete={handleDeleteSize}
                placeholder="Add size..."
              />
            </TableCell>
            <TableCell>
              <Button
                onClick={handleAccept}
                sx={{ color: "blue", fontSize: "20px" }}
              >
                Thêm mới
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ảnh</TableCell>
            <TableCell>
              <TextField
                onChange={(event) => handleAvatarChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Danh sách ảnh</TableCell>
            <TableCell>
              <ReactTags
                tags={imgs}
                handleAddition={handleAdditionImg}
                handleDelete={handleDeleteImg}
                placeholder="Add img..."
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số lượng</TableCell>
            <TableCell>
              <TextField
                onChange={(event) => handleQuantityChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Giá</TableCell>
            <TableCell>
              <TextField
                onChange={(event) => handlePriceChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}
