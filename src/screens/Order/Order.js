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
      .get("http://localhost:5000/api/order/myorder", {
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
      title: "Mã đơn hàng",
      dataIndex: "_id",
      width: "15%",
      editable: true,
      align: "center",
    },
    {
      title: "Tên người nhận",
      dataIndex: "fullName",
      align: "center",
      width: "15%",
      editable: true,
      render: (text, record) => (
        <Typography>{`${record.firstName} ${record.lastName}`}</Typography>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
      width: "10%",
      editable: true,
    },
    {
      title: "Địa chỉ",
      align: "center",
      dataIndex: "address",
      width: "15%",
    },
    {
      title: "Tình trạng đơn hàng",
      align: "center",
      dataIndex: "status",
      width: "10%",
      render: (status) => {
        let color;
        if (status === "Đang xử lý đơn hàng...") {
          color = "blue";
        } else if (status === "Đã xác nhận") {
          color = "green";
        } else {
          color = "red";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Ngày đặt",
      align: "center",
      dataIndex: "createdAt",
      width: "10%",
      render: (text) => dayjs(text).format("HH:mm DD-MM-YYYY"),
    },
    {
      title: "Tổng giá đơn hàng",
      dataIndex: "total",
      align: "center",
      width: "10%",
      render: (total) => <span>{total.toLocaleString("vi-VN")} VNĐ</span>,
    },
    {
      title: "",
      align: "center",
      dataIndex: "operation",
      width: "15%",

      render: (_, record) => (
        <div>
          <Button type="primary" href={`order/${record._id}`}>
            Xem chi tiết
          </Button>
          {record.status !== "Đã hủy" && (
            <Popconfirm
              title="Bạn có chắc chắn muốn hủy đơn hàng này?"
              onConfirm={() => handleCancel(record._id)}
            >
              <Button
                type="primary"
                danger
                disabled={record.status === "Đã hủy"}
              >
                Hủy
              </Button>
            </Popconfirm>
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
      <Title level={2}>Danh sách các đơn hàng</Title>
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
