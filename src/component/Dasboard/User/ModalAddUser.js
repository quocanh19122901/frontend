import { Button, Modal, Input } from "antd";
import { useState } from "react";
import axios from "axios";
import "./ModalAddUser.css";
import { useForm } from "react-hook-form";
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
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Add user"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          className="ant-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="ant-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="ant-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default ModalAddUser;
