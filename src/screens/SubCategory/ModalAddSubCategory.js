import { Button, Modal, Input } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
const ModalAddCategory = ({ setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      await axios.post("http://localhost:5000/api/subcategory", {
        SubCategoryName: subCategoryName,
      });
      const { data } = await axios.get("http://localhost:5000/api/subcategory");
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
