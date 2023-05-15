import {
  Form,
  InputNumber,
  Input,
  Popconfirm,
  Table,
  Typography,
  Space,
  Button,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import "../Table.css";
import axios from "axios";
import ModalAddUser from "./ModalAddUser";
import { useMemo } from "react";

const TableUser = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const isEditing = (record) => record.key === editingKey;

  const searchInput = useRef(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user")
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
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
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData.splice(index, 1);
        setData(newData);
        // Call DELETE API request
        const response = await axios.delete(
          `http://localhost:5000/api/user/${key}`,
          newData
        );
      }
    } catch (errInfo) {
      console.log("Error deleting data:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "Id tài khoản",
      dataIndex: "_id",
      width: "15%",
      editable: "true",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Tài khoản",
      dataIndex: "username",
      align: "center",
      width: "25%",
      editable: "true",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
      align: "center",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Quản trị viên",
      dataIndex: "isAdmin",
      key: "isAdmin",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.isAdmin - b.isAdmin,
      render: (isAdmin) => (
        <>
          {isAdmin ? (
            <Tag color="green">True</Tag>
          ) : (
            <Tag color="red">False</Tag>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "operation",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa tài khoản này?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a style={{ color: "red" }}>Xóa</a>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <ModalAddUser setData={setData} />
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </>
  );
};
export default TableUser;
