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
import Loader from "./components/layout/Loader/Loader";
import Dashboard from "./components/admin/Dashboard";

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
  }, [stripeApiKey]);

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
