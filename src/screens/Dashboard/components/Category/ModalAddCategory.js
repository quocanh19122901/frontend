import { Button, Modal, Input } from "antd";
import { useState } from "react";
import axios from "axios";
import "./ModalAddCategory.css";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useTheme } from "styled-components";
import { useEffect } from "react";
const ModalAddCategory = ({ setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const navigate = useNavigate();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const subCategoryList = [].concat(
    ...subCategory.map((item) => item.SubCategoryName)
  );

  const handleChange = (event, value) => {
    setSelectedId(value.map((option) => option._id));
  };
  const handleOk = async () => {
    try {
      await axios.post("http://localhost:5000/api/category", {
        CategoryName: CategoryName,
        SubCategory: selectedId,
      });
      const { data } = await axios.get("http://localhost:5000/api/category");
      const modifiedData = data.map(({ _id, ...rest }) => ({
        ...rest,
        key: _id,
      }));
      setData(modifiedData);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/subcategory")
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          key: item._id,
        }));
        setSubCategory(modifiedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setSubCategory]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Box sx={{ margin: "20px 30px" }}>
        <Button type="primary" onClick={showModal}>
          Tạo danh mục mới
        </Button>
      </Box>
      <Modal
        title="Thêm danh mục"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          className="ant-input"
          placeholder="Tên danh mục"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={subCategory}
          getOptionLabel={(option) => option.SubCategoryName}
          filterSelectedOptions
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Danh mục phụ"
              placeholder="Favorites"
            />
          )}
        />
      </Modal>
    </>
  );
};
export default ModalAddCategory;
