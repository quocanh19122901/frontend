import {
  Form,
  InputNumber,
  Input,
  Popconfirm,
  Table,
  Typography,
  Tag,
  Button,
} from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Title from "antd/es/typography/Title";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ManageContact = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const handleCancel = (record) => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }
    const token = getCookie("access_Token");
    axios
      .delete(`http://localhost:5000/api/order/${record}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        toast.success("Huy don hang thanh cong");
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
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
      .get("http://localhost:5000/api/contact", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [setData]);
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "_id",
      width: "12%",
      align: "center",
    },
    {
      title: "Ngày tạo",
      align: "center",
      dataIndex: "createdAt",
      width: "10%",
      render: (text) => dayjs(text).format("HH:mm DD-MM-YYYY"),
    },

    {
      title: "Tên người nhận",
      dataIndex: "fullName",
      align: "center",
      width: "12%",
    },
    {
      title: "Mã người dùng",
      align: "center",
      dataIndex: "userId",
      width: "12%",
    },

    {
      title: "Vấn đề gặp phải",
      align: "center",
      dataIndex: "problem",
      width: "12%",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "OrderId",
      width: "12%",
      align: "center",
    },
    {
      title: "Mong muốn",
      align: "center",
      dataIndex: "desire",
      width: "12%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
      width: "10%",
    },

    {
      title: "Tình trạng đơn hàng",
      align: "center",
      dataIndex: "status",
      width: "7%",
      render: (status) => {
        let color;
        if (status === "Đang xử lý...") {
          color = "blue";
        } else {
          color = "green";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Title level={2}>Danh sách các phiếu hỗ trợ</Title>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default ManageContact;
