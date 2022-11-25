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

export default function Products() {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const { products, error, loading, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
    console.log("hamza");
  };

  useEffect(() => {
    getProduct(dispatch, keyword, currentPage);
  }, [dispatch, keyword, currentPage]);

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
    <Fragment>
      <MetaData title={"All products -- Ecommerce "} />
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {products &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
      {resultPerPage < productCount && (
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
