import { Form, InputNumber, Input, Popconfirm, Table, Typography } from "antd";
import { useState, useEffect, useMemo } from "react";
// import "../Table.css";
import axios from "axios";
import ModalAddSubCategory from "./ModalAddSubCategory";
import jwt_decode from "jwt-decode";

// import "./TableCategory.css";
const originData = [];

const Subcategory = () => {
  const [subCategoryName, setSubCategoryName] = useState("");

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
            <Input onChange={(e) => setSubCategoryName(e.target.value)} />
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
      .get("http://localhost:5000/api/subcategory")
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
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }
    const token = getCookie("access_Token");
    const decodeToken = jwt_decode(token);

    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData.splice(index, 1);
        setData(newData);
        // Call DELETE API request
        const response = await axios.delete(
          `http://localhost:5000/api/subcategory/${key}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }
    } catch (errInfo) {
      console.log("Error deleting data:", errInfo);
    }
  };
  const edit = (record) => {
    form.setFieldsValue({
      title: "",
      // description: '',
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
        const updatedData = { SubCategoryName: subCategoryName };
        const response = await axios.put(
          `http://localhost:5000/api/subcategory/${key}`,
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
      title: "Tên",
      dataIndex: "SubCategoryName",
      width: "40%",
      editable: true,
    },
    {
      title: "Tạo ngày",
      dataIndex: "createdAt",
      width: "20%",
      editable: false,
    },

    {
      title: "",
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
              Sửa
            </Typography.Link>
            <Popconfirm
              title="Are you sure you want to delete this record?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a style={{ color: "red" }}>Xóa</a>
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
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <ModalAddSubCategory setData={setData} />
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
export default Subcategory;
