import { Button, Modal, Input } from "antd";
import { useState } from "react";
import axios from "axios";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { cloneDeep } from "lodash";
const ModalAddCategory = ({ setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState({
    label: "",
    value: "",
  });
  const [subCategoryName, setSubCategoryName] = useState("");
  const [CategoryName, setCategoryName] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then((response) => {
        const modifiedData = response.data.map((item) => {
          return {
            label: item.CategoryName,
            value: item._id,
          };
        });
        setOptions(modifiedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (event, value) => {
    setCategoryName(value.value);
  };
  const handleOk = async () => {
    try {
      await axios.post("http://localhost:5000/api/subcategory", {
        SubCategoryName: subCategoryName,
        CategoryId: CategoryName,
      });
      const { data } = await axios.get("http://localhost:5000/api/subcategory");
      const modifiedData = data.map((item) => {
        const cloneItem = cloneDeep(item);
        delete cloneItem.CategoryId;
        return {
          ...cloneItem,
          CategoryName: item.CategoryId.CategoryName,
          createdAt: item.createdAt,
          key: item._id,
        };
      });
      setData(modifiedData);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Box sx={{ margin: "20px 30px" }}>
        <Button type="primary" onClick={showModal}>
          Tạo danh mục phụ
        </Button>
      </Box>
      <Modal
        title="Tạo mới danh mục phụ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Autocomplete
          disablePortal
          size="small"
          sx={{ mb: "1rem" }}
          id="combo-box-demo"
          options={options}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Tên danh mục cha" />
          )}
        />
        <Input
          className="ant-input"
          placeholder="Tên danh mục phụ"
          onChange={(e) => setSubCategoryName(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default ModalAddCategory;
