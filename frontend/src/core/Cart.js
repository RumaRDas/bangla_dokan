import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItes = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    <h2>
      Your cart is empty
      <br /> <Link to="/shop"> Continue Shopping</Link>
    </h2>;
  };
  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items, Add remove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItes(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2>Show Checkout option</h2>
          <h2>Show Shipping address</h2>
          <h2>Show update quantity</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
