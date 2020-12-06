import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apicor";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  //finding products by sold number
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.Error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  //Finding products by new arrival
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.Error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title="Home Page" description="Node React E-commerce App">
      {JSON.stringify(productsBySell)}
      <hr />
      {JSON.stringify(productsByArrival)}
    </Layout>
  );
};

export default Home;
