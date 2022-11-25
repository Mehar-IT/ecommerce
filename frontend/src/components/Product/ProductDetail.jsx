import React, { Fragment, useEffect } from "react";
import "./productDetail.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/apiCalls";
import { useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { reset } from "../../redux/productDetailSlice";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );
  const { id } = useParams();
  const alert = useAlert();

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    value: product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  useEffect(() => {
    getProductDetail(dispatch, id);
  }, [dispatch, id, alert]);

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
      <MetaData title={`${product.name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((image, index) => (
                <img
                  className="CarouselImage"
                  key={index}
                  src={image.url}
                  alt={`${index} slide`}
                />
              ))}
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`Rs.${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button
                // onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  readOnly
                  type="number"
                  // value={quantity}
                  value={"1"}
                />
                <button
                // onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                disabled={product.Stock < 1 ? true : false}
                // onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button
            // onClick={submitReviewToggle}
            className="submitReview"
          >
            Submit Review
          </button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  );
}
