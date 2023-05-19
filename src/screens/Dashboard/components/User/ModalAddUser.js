import { Button, Modal, Input, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import "./ModalAddUser.css";
import { Box } from "@mui/material";
import Title from "antd/es/typography/Title";
const ModalAddUser = ({ setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username: username,
        password: password,
        email: email,
        isAdmin: isAdmin,
      });
      const { data } = await axios.get("http://localhost:5000/api/user");
      const modifiedData = data.map(({ _id, ...rest }) => ({
        ...rest,
        key: _id,
      }));
      setData(modifiedData);
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Title level={2}>Danh sách các tài khoản</Title>
      <Box sx={{ margin: "20px 30px" }}>
        <Button type="primary" onClick={showModal}>
          Tạo tài khoản mới
        </Button>
      </Box>

      <Modal
        title="Tạo tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <Input
          className="ant-input"
          placeholder="Tài khoản"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="ant-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="ant-input"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />
        <h4>Phân quyền admin</h4>
        <Select
          defaultValue={false}
          style={{ width: "100%" }}
          onChange={(value) => setIsAdmin(value)}
        >
          <Option value={false}>false</Option>
          <Option value={true}>true</Option>
        </Select>
      </Modal>
    </>
  );
};
export default ModalAddUser;
