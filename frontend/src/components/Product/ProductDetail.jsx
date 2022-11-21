import React, { useEffect } from "react";
import "./productDetail.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/apiCalls";
import { useParams } from "react-router-dom";

export default function ProductDetail({ match }) {
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );
  const { id } = useParams();

  useEffect(() => {
    getProductDetail(dispatch, id);
  }, [dispatch, id]);

  return (
    <div className="productDetail">
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
    </div>
  );
}
