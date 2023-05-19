import { Button, Dropdown, Menu, Space } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import axios from "axios";
import { cloneDeep } from "lodash";
import { react, useEffect, useState } from "react";

export default function CategoryMenu({ setData }) {
  const [category, setCategory] = useState([
    {
      CategoryId: "",
      CategoryName: "",
      subCategories: [],
    },
  ]);

  const [subCategory, setSubCategory] = useState([
    {
      CategoryId: "",
      subCategoryName: "",
    },
  ]);
  const [categoryMenu, setCategoryMenu] = useState([]);
  useEffect(() => {
    // Fetch category data
    axios.get("http://localhost:5000/api/category").then((response) => {
      const modifiedData = response.data.map((item) => {
        return {
          CategoryId: item._id,
          CategoryName: item.CategoryName,
          subCategories: [],
        };
      });
      // Chỉ cập nhật category khi chưa hoàn thành khởi tạo
      setCategory(modifiedData);
      // console.log(response.data);
    });
  }, [setCategory]);
  const handleClick = (id) => {
    axios
      .get(`http://localhost:5000/api/products/subcategory/${id}`)
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
  };
  useEffect(() => {
    // Fetch subcategory data
    axios
      .get("http://localhost:5000/api/subcategory")
      .then((response) => {
        const modifiedData = response.data.map((item) => {
          const cloneItem = cloneDeep(item);
          delete cloneItem.CategoryId;
          return {
            ...cloneItem,
            CategoryId: item.CategoryId._id,
            subCategoryName: item.SubCategoryName, // Updated property name to match category array
          };
        });
        setSubCategory(modifiedData);
        // console.log(modifiedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (category.length > 0 && subCategory.length > 0) {
      let isCategoryUpdated = false;
      const updatedCategory = category.map((item) => ({
        ...item,
        subCategories: [],
      }));

      for (let i = 0; i < subCategory.length; i++) {
        let subcate = subCategory[i];
        let categoryId = subcate.CategoryId;
        let categoryIndex = updatedCategory.findIndex(
          (c) => c.CategoryId === categoryId
        );

        if (categoryIndex !== -1) {
          updatedCategory[categoryIndex].subCategories.push(subcate);
          isCategoryUpdated = true; // Đánh dấu đã cập nhật category
        }
      }

      if (isCategoryUpdated) {
        setCategoryMenu(updatedCategory);
      }
    }
  }, [category, subCategory]);
  // console.log(categoryMenu);
  return (
    <Menu mode="horizontal">
      {categoryMenu?.map((category, categoryIndex) => (
        <SubMenu
          key={`category-${categoryIndex}`}
          title={category.CategoryName}
        >
          {category.subCategories?.map((subcategory, subcategoryIndex) => (
            <Menu.Item
              key={`subcategory-${categoryIndex}-${subcategoryIndex}`}
              onClick={() => {
                handleClick(subcategory._id);
              }}
            >
              {subcategory.subCategoryName}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
}
