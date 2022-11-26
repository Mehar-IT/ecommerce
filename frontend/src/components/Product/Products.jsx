import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/apiCalls";
import { reset } from "../../redux/productSlice";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

export default function Products() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [price, setprice] = useState([0, 25000]);
  const [currentPage, setcurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const { keyword } = useParams();
  const [ratings, setRatings] = useState(0);

  const {
    products,
    error,
    loading,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  let count = filteredProductsCount;

  const priceHandler = (e, newPrice) => {
    setprice(newPrice);
  };

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  useEffect(() => {
    getProduct(
      dispatch,
      keyword,
      currentPage,
      price,
      category.toLowerCase(),
      ratings
    );
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(reset());
    }
  }, [error, alert]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title={"All products -- Ecommerce "} />
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {products &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
      <div className="filterBox">
        <Typography>Price</Typography>

        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </fieldset>
      </div>
      {resultPerPage < count && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
}
