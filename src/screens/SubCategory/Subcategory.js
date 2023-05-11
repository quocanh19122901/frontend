import { Form, InputNumber, Input, Popconfirm, Table, Typography } from "antd";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ModalAddSubCategory from "./ModalAddSubCategory";
import jwt_decode from "jwt-decode";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
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
        const modifiedData = response.data.map((item) => {
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
      title: "Tên danh mục",
      dataIndex: "SubCategoryName",
      sorter: (a, b) => a.SubCategoryName.length - b.SubCategoryName.length,
      width: "25%",
      align: "center",

      editable: true,
    },
    {
      title: "Tên danh mục cha",
      dataIndex: "CategoryName",
      width: "25%",
      align: "center",
      editable: false,
      sorter: (a, b) => a.CategoryName.length - b.CategoryName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tạo ngày",
      dataIndex: "createdAt",
      width: "20%",
      align: "center",
      editable: false,
      render: (text) => dayjs(text).format("HH:mm DD-MM-YYYY"),
    },

    {
      align: "center",
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
              Lưu
            </Typography.Link>
            <Popconfirm title="Chắc chắn muốn quay lại?" onConfirm={cancel}>
              <a>Quay lại</a>
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
              title="Xác nhận xóa danh mục con này ?"
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
      <Title level={2}>Danh sách các danh mục phụ</Title>
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
