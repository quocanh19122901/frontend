import { Form, InputNumber, Input, Popconfirm, Table, Typography } from "antd";
import { useState, useEffect, useMemo } from "react";
import "../Table.css";
import axios from "axios";
import ModalAddCategory from "./ModalAddProduct";
import "./ProductDetail.css";
import CustomDropdown from "./Dropdown";
const originData = [];

const ProductDetail = () => {
  const [categoryName, setCategoryName] = useState("");

  const EditableCell = useMemo(
    () =>
      ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode =
          inputType === "number" ? (
            <InputNumber />
          ) : (
            <Input onChange={(e) => setCategoryName(e.target.value)} />
          );
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
      },
    []
  );
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
          key: item._id,
        }));
        setData(modifiedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const handleDelete = async (key) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData.splice(index, 1);
        setData(newData);
        // Call DELETE API request
        const response = await axios.delete(
          `http://localhost:5000/api/category/${key}`,
          newData
        );
      }
    } catch (errInfo) {
      console.log("Error deleting data:", errInfo);
    }
  };
  const edit = (record) => {
    form.setFieldsValue({
      title: "",
      description: "",
      // SubCategory:'',
      // status: '',
      createdAt: "",
      updatedAt: "",
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
        // Call PUT API request
        const updatedData = { CategoryName: categoryName };
        const response = await axios.put(
          `http://localhost:5000/api/category/${key}`,
          updatedData
        );
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
      title: "Title",
      dataIndex: "productName",
      width: "15%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "desc",
      width: "15%",
      editable: true,
    },
    {
      title: "Image",
      dataIndex: "img",
      width: "15%",
      editable: true,
    },
    {
      title: "Sub Category",
      dataIndex: "subCategoryId",
      width: "15%",
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      width: "20%",
      editable: false,
    },
    {
      title: "Category",
      dataIndex:<CustomDropdown />,
      width: "20%",
      editable: false,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div className="btn_config">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Are you sure you want to delete this record?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          </div>
        );
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
        inputType:
          col.dataIndex === "createdAt" || "updatedAt" ? "date" : "text",
        dataIndex: col.dataIndex,
        filterDropdown:col.filterDropdown,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <ModalAddCategory setData={setData} />
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
export default ProductDetail;
