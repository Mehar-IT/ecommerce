import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../redux/apiCalls";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { reset } from "../../redux/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    getProduct(dispatch);
  }, [dispatch, error, alert]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(reset());
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title={"Ecommerce"} />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Product</h2>
      <div className="container" id="container">
        {products &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </>
  );
}
