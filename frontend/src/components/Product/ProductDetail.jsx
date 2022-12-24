import React, { Fragment, useEffect, useState } from "react";
import "./productDetail.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, addItemsToCart } from "../../redux/utils/apiCalls";
import { useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { reset } from "../../redux/productDetailSlice";
import { resetReview } from "../../redux/reviewSlice";
import { review } from "../../redux/utils/apiCalls";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import Rating from "@mui/material/Rating";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );
  const { success, error: reviewError } = useSelector((state) => state.review);
  const { id } = useParams();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    value: product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };
  const addToCartHandler = () => {
    addItemsToCart(dispatch, id, quantity);
    alert.success("Item added to cart");
  };

  useEffect(() => {
    getProductDetail(dispatch, id);
  }, [dispatch, id, success]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(reset());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(resetReview());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch(resetReview());
    }
  }, [error, alert, reviewError, success]);

  if (loading) {
    return <Loader />;
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    review(dispatch, myForm);

    setOpen(false);
  };

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
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                disabled={product.stock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b
                className={`badge ${
                  product.stock < 1 ? "redColor" : "greenColor"
                }`}
              >
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            // value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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
