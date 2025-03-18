import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Homepage/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import CheckoutPage from "../pages/CheckoutPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import AdminPanelPage from "../pages/Admin/AdminPanelPage";
import UserManagementSection from "../pages/Admin/UserManagementSection";
import ProductManagementSection from "../pages/Admin/ProductManagementSection";
import OrderManagementSection from "../pages/Admin/OrderManagementSection";
// import LoginAndReg from "../pages/LoginAndReg";
import SuccessPayment from "../pages/SuccessPayment";
import CancelPayment from "../pages/CancelPayment";
import PrivateAdminProtector from "./PrivateAdminProtector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "product-detail/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "product/category/laptop",
        element: <h1>Product Category</h1>,
      },
      {
        path: "shopping-cart",
        element: <ShoppingCartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "success",
        element: <SuccessPayment />,
      },
      {
        path: "cancel",
        element: <CancelPayment />,
      },
      {
        path: "order-details/:id",
        element: <OrderConfirmationPage />,
      },
      {
        path: "order-history",
        element: <OrderHistoryPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      // {
      //   path: "login-reg",
      //   element: <LoginAndReg />,
      // },
      {
        path: "admin",
        element: <PrivateAdminProtector>
                    <AdminPanelPage />
                 </PrivateAdminProtector>,
        children: [
          {
            path: "users",
            element: <UserManagementSection />,
          },
          {
            path: "products",
            element: <ProductManagementSection />,
          },
          {
            path: "orders",
            element: <OrderManagementSection />,
          },
        ],
      },
    ],
  },
]);


export default router