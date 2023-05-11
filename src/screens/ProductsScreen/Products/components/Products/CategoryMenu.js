import { Button, Dropdown, Space } from "antd";
import axios from "axios";
import { react, useEffect, useState } from "react";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];
export default function CategoryMenu() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/category").then((response) => {
      setCategory(response.data);
      console.log(response.data);
    });
  }, [setCategory]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/subcategory/search/${categoryId}")
      .then((response) => {
        setSubCategory(response.data);
        console.log(response.data);
      });
  }, [setCategory]);

  return (
    <Space direction="horizontal">
      {category.map((item, index) => (
        <div key={index}>
          <Space wrap>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <Button>{item.CategoryName}</Button>
            </Dropdown>
          </Space>
        </div>
      ))}
    </Space>
  );
}
