import DashboardLayout from "layouts/DashboardLayout";
import DefaultLayout from "layouts/DefaultLayout";
import LoginLayout from "layouts/LoginLayout";
import AboutUs from "screens/AboutUs/AboutUs";
import Dashboard from "screens/Dashboard/Dashboard";
import CategoryDetail from "screens/Dashboard/components/Category/CategoryDetail";
import ProductDetail from "screens/Dashboard/components/Products/ProductDetail";
import TableUser from "screens/Dashboard/components/User/TableUser";
import DetailProduct from "screens/DetailProduct/DetailProduct";
import Home from "screens/HomeScreen/Home";
import LogInScreen from "screens/LogInScreen/LogInScreen";
import ProductsScreen from "screens/ProductsScreen/Products/components/ProductsScreen";

export const routeConfig = [
  {
    path: "/home",
    component: Home,
    layout: DefaultLayout,
    private: false,
    isAdmin: false,
  },
  {
    path: "/products",
    component: ProductsScreen,
    layout: DefaultLayout,
    isAdmin: false,
    private: false,
  },
  {
    path: "/Aboutus",
    component: AboutUs,
    layout: DefaultLayout,
    isAdmin: false,
    private: false,
  },
  {
    path: "/products/:id",
    component: DetailProduct,
    layout: DefaultLayout,
    isAdmin: false,
    private: true,
  },
  {
    path: "/",
    component: LogInScreen,
    layout: LoginLayout,
    isAdmin: false,
    private: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
  {
    path: "/dashboard/account",
    component: TableUser,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
  {
    path: "/dashboard/products",
    component: ProductDetail,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
  {
    path: "/dashboard/category",
    component: CategoryDetail,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
];
