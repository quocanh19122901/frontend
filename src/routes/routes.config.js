import DashboardLayout from "layouts/DashboardLayout";
import DefaultLayout from "layouts/DefaultLayout";
import LoginLayout from "layouts/LoginLayout";
import AboutUs from "screens/AboutUs/AboutUs";
import Dashboard from "screens/Dashboard/Dashboard";
import CategoryDetail from "screens/Dashboard/components/Category/CategoryDetail";
import AllOrder from "screens/Dashboard/components/Order/AllOrder";
import TableUser from "screens/Dashboard/components/User/TableUser";
import DetailProduct from "screens/DetailProduct/DetailProduct";
import Home from "screens/HomeScreen/Home";
import LogInScreen from "screens/LogInScreen/LogInScreen";
import Order from "screens/Order/Order";
import OrderDetail from "screens/Order/OrderDetail";
import Payment from "screens/Payment/Payment";
import ProductsScreen from "screens/ProductsScreen/Products/components/ProductsScreen";
import Profile from "screens/Profile/Profile";
import OrderDetailDashboard from "screens/Dashboard/components/Order/OrderDetailDashboard";
import AllProduct from "screens/Dashboard/components/Products/AllProduct";
import ProductDetailDashboard from "screens/Dashboard/components/Products/ProductDetailDashboard";
import AddProduct from "screens/Dashboard/components/Products/AddProduct";
import SignUpScreen from "screens/SignUp/SignUpScreen";
import EditProfile from "screens/Profile/EditProfile";
import ContactScreen from "screens/Contact/ContactScreen";
import AllContact from "screens/Contact/AllContact";
import { ManageAccounts } from "@mui/icons-material";
import ManageContact from "screens/Dashboard/components/Contact/ManageContact";
import Subcategory from "screens/SubCategory/Subcategory";
import Statistics from "screens/Dashboard/components/statistics/Statistics";
import ProfileLayout from "layouts/ProfileLayout";

export const routeConfig = [
  {
    path: "/home",
    component: Home,
    layout: DefaultLayout,
    private: false,
    isAdmin: false,
  },
  {
    path: "/profile",
    component: Profile,
    layout: ProfileLayout,
    private: false,
    isAdmin: false,
  },
  {
    path: "/profile/edit",
    component: EditProfile,
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
    path: "/contact",
    component: ContactScreen,
    layout: DefaultLayout,
    isAdmin: false,
    private: false,
  },
  {
    path: "/order",
    component: Order,
    layout: ProfileLayout,
    isAdmin: false,
    private: false,
  },
  {
    path: "/support",
    component: AllContact,
    layout: ProfileLayout,
    isAdmin: false,
    private: false,
  },
  {
    path: "/order/:id",
    component: OrderDetail,
    layout: DefaultLayout,
    isAdmin: false,
    private: false,
  },
  {
    path: "dashboard/order/:id",
    component: OrderDetailDashboard,
    layout: DashboardLayout,
    isAdmin: false,
    private: false,
  },
  {
    path: "/payment",
    component: Payment,
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
    path: "/signup",
    component: SignUpScreen,
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
    path: "/dashboard/contact",
    component: ManageContact,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
  {
    path: "/dashboard/products",
    component: AllProduct,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
  {
    path: "/dashboard/products/:id",
    component: ProductDetailDashboard,
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
  {
    path: "/dashboard/subcategory",
    component: Subcategory,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
  {
    path: "/dashboard/products/add",
    component: AddProduct,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
  {
    path: "/dashboard/order",
    component: AllOrder,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
  {
    path: "/dashboard/statistics",
    component: Statistics,
    layout: DashboardLayout,
    isAdmin: true,
    private: true,
  },
];
