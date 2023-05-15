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
const Order = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const handleClick = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/contact/${id}`
      );
      window.location.reload();
      toast.success("Đã hoàn thành phiếu hỗ trợ");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    }
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
      .get("http://localhost:5000/api/contact/mycontact", {
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
      width: "15%",
      align: "center",
    },
    {
      title: "Tên người gửi",
      dataIndex: "fullName",
      align: "center",
      width: "15%",
    },
    {
      title: "Vấn đề",
      dataIndex: "problem",
      align: "center",
      width: "15%",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "OrderId",
      align: "center",
      width: "15%",
    },
    {
      title: "Mong muốn",
      dataIndex: "desire",
      align: "center",
      width: "15%",
    },
    {
      title: "Ngày tạo",
      align: "center",
      dataIndex: "createdAt",
      width: "10%",
      render: (text) => dayjs(text).format("HH:mm DD-MM-YYYY"),
    },
    {
      title: "Trạng thái phiếu ",
      align: "center",
      dataIndex: "status",
      width: "10%",
      render: (status) => {
        let color;
        if (status === "Đang xử lý đơn hàng...") {
          color = "blue";
        } else {
          color = "green";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "",
      align: "center",
      dataIndex: "operation",
      width: "15%",

      render: (_, record) => (
        <div>
          {record.status === "Đã giải quyết" ? (
            ""
          ) : (
            <Button type="primary" onClick={() => handleClick(record._id)}>
              Hoàn thành
            </Button>
          )}
        </div>
      ),
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
      <Title level={2}>Danh sách phiếu đã gửi</Title>
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
export default Order;
