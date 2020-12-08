import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product, showViewProductButton = true }) => {
  //substring(0,10) is function for showing limit text

  const showViewbutton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <button className="btn btn-outline-success mt-2 mb-2 mr-2">
          View product
        </button>
      )
    );
  };
  return (
    <div className="card">
      <div className="card-header"> {product.name} </div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        <p>{product.description.substring(0, 100)}</p>
        <p>{product.price}</p>
        <Link to={`/product/${product._id}`}>
          {showViewbutton(showViewProductButton)}
        </Link>
        <button className="btn btn-outline-warning mt-2 mb-2">
          Add to card
        </button>
      </div>
    </div>
  );
};

export default Card;
