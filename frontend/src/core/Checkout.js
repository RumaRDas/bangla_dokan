import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apicor";
import Card from "./Card";

import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { emptyCart } from "./cartHelpers";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  //getting authenticated user id
  const userId = isAuthenticated() && isAuthenticated().user._id;
  //getting authenticated user token
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };
  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </Link>
    );
  };

  let deliveryAddress = data.address;
  //when click pay
  const buy = () => {
    setData({ loading: true });
    //send the nonce  to your server
    //nonce= data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        //once you have nonce (card type, card number) send nonce as 'paymentMethod'to backend
        //and also total to be charged
        // console.log(
        //   "send nonce and total to process: ",
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            //  console.log(response);
            const createOrderData = {
              products: products,
              transaction_id: response.transaction_id,
              amount: response.transaction.amount,
              address: data.address,
            };
            //empty cart
            // create order
            createOrder(userId, token, createOrderData);
            emptyCart(() => {
              setRun(!run);
              console.log("payment success and empty cart");
              setData({ success: true, loading: false });
            });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  //only show drop in when token is there
  const showDropIn = () => {
    return (
      <div
        onBlur={() => {
          setData({ ...data, error: "" });
        }}
      >
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="gorm-group mb-3">
              <label className="text-mutes">Delivery address:</label>
              <textarea
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Tye your delevery address Her...."
              />
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={buy}>
              Pay
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        Thanks Your payment was successful
      </div>
    );
  };

  const showLOading = (loading) => {
    loading && <h2>LOading...</h2>;
  };

  return (
    <div>
      <h2> Total: ${getTotal()}</h2>
      {showLOading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
