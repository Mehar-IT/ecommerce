import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product";

const product = {
  name: "Blue shirt",
  price: "Rs",
  _id: "hamzatarique",
  images: [
    "https://www.squareyards.com/blog/wp-content/uploads/2022/03/Convert-PKR-Currency-to-INR.jpg",
  ],
};
export default function Home() {
  return (
    <>
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
}
