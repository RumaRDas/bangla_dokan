import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({ product, showViewProductButton = true }) => {
  //substring(0,10) is function for showing limit text

  const showViewbutton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-success mt-2 mb-2 mr-2">
            View product
          </button>
        </Link>
      )
    );
  };

  const showAddToCartBtn = () => {
    return (
      <button className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
        Add to cart
      </button>
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span>Out of Stock</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name"> {product.name} </div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewbutton(showViewProductButton)}
        {showAddToCartBtn()}
      </div>
    </div>
  );
};

export default Card;
