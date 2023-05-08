import {
  Form,
  InputNumber,
  Input,
  Popconfirm,
  Table,
  Typography,
  Space,
  Button,
} from "antd";
import { useState, useEffect, useMemo } from "react";
import "../Table.css";
import axios from "axios";
import ModalAddCategory from "./ModalAddCategory";
import "./TableCategory.css";
import { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const CategoryDetail = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
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
      .get("http://localhost:5000/api/category")
      .then((response) => {
        const modifiedData = response.data.map((item) => {
          const subCateString = item.SubCategory.map(
            (value) => value.SubCategoryName
          ).join(", ");
          return {
            ...item,
            key: item._id,
            SubCategory: subCateString,
          };
        });
        setData(modifiedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isEditing = (record) => record.key === editingKey;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleDelete = async (key) => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }
    const token = getCookie("access_Token");
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData.splice(index, 1);
        setData(newData);
        // Call DELETE API request
        const response = await axios.delete(
          `http://localhost:5000/api/category/${key}`,
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
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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
      title: "Tên danh mục",
      dataIndex: "CategoryName",
      width: "25%",
      editable: "true",
      ...getColumnSearchProps("CategoryName"),
    },
    {
      title: "Tên danh mục phụ",
      dataIndex: "SubCategory",
      width: "25%",
      editable: false,
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
export default CategoryDetail;
