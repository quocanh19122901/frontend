import { Button, Modal, Input } from "antd";
import { useState } from "react";
import axios from "axios";
import "./ModalAddCategory.css";
import { useNavigate } from "react-router-dom";
const ModalAddCategory = ({ setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      await axios.post("http://localhost:5000/api/category", { CategoryName });
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Add Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          className="ant-input"
          placeholder="CategoryName"
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default ModalAddCategory;
