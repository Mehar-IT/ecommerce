import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function ProductCard({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Rfeviews)
        </span>
      </div>
      <span>{`Rs:${product.price}`}</span>
    </Link>
  );
}
