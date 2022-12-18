import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.jsx";
import ProductDetail from "./components/Product/ProductDetail.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import LoginSignUp from "./components/User/LoginSignUp.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/utils/apiCalls";
import UserOption from "./components/layout/Header/UserOption.jsx";
import Profile from "./components/User/Profile.jsx";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid", "Chilanks"],
      },
    });
    loadUser(dispatch);
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOption user={user} />}
      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route extact path="/account" element={<Profile />} />
          <Route extact path="/me/update" element={<UpdateProfile />} />
          <Route extact path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route extact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route extact path="/product/:id" element={<ProductDetail />} />
        <Route extact path="/search" element={<Search />} />
        <Route extact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
