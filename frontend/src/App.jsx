import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetail from "./components/Product/ProductDetail";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import { useSelector } from "react-redux";
import UserOption from "./components/layout/Header/UserOption";
import Profile from "./components/User/Profile";
import {
  AdminProtectedRoute,
  UserProtectedRoute,
} from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import OrderDetail from "./components/Order/OrderDetail";
import Myorders from "./components/Order/Myorders";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./components/Admin/Dashboard";
import ProducrList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import Loader from "./components/layout/Loader/Loader";
import ProductReviews from "./components/Admin/ProductReviews";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://127.0.0.1:3000/api/v1/stripeapikey",
      { withCredentials: true }
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid", "Chilanks"],
      },
    });
    isAuthenticated && getStripeApiKey();
  }, [stripeApiKey, isAuthenticated]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // document.onkeydown = function (e) {
  //   if (e.key == 123) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.key == "I".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.key == "C".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.key == "J".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.key == "U".charCodeAt(0)) {
  //     return false;
  //   }
  // };

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOption user={user} />}

      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route element={<UserProtectedRoute />}>
          <Route extact path="/account" element={<Profile />} />
          <Route extact path="/me/update" element={<UpdateProfile />} />
          <Route extact path="/password/update" element={<UpdatePassword />} />
          <Route extact path="/login/shipping" element={<Shipping />} />
          <Route extact path="/order/confirm" element={<ConfirmOrder />} />
          <Route extact path="/success" element={<OrderSuccess />} />
          <Route extact path="/orders" element={<Myorders />} />
          <Route extact path="/order/:id" element={<OrderDetail />} />
          <Route extact path="/about" element={<About />} />
          <Route extact path="/contact" element={<Contact />} />
          <Route
            exact
            path="/process/payment"
            element={
              stripeApiKey ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              ) : (
                <Loader />
              )
            }
          />
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route extact path="/admin/dashboard" element={<Dashboard />} />
          <Route extact path="/admin/products" element={<ProducrList />} />
          <Route extact path="/admin/product" element={<NewProduct />} />
          <Route extact path="/admin/product/:id" element={<UpdateProduct />} />
          <Route extact path="/admin/orders" element={<OrderList />} />
          <Route extact path="/admin/order/:id" element={<ProcessOrder />} />
          <Route extact path="/admin/users" element={<UsersList />} />
          <Route extact path="/admin/user/:id" element={<UpdateUser />} />
          <Route extact path="/admin/reviews" element={<ProductReviews />} />
        </Route>

        <Route
          extact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route extact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route extact path="/product/:id" element={<ProductDetail />} />
        <Route extact path="/password/forgot" element={<ForgotPassword />} />
        <Route extact path="/search" element={<Search />} />
        <Route extact path="/login" element={<LoginSignUp />} />
        <Route extact path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
