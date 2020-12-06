import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apicor";

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [peoductByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  return (
    <Layout title="Home Page" description="Node React E-commerce App">
      <h2>Home Of Bangladokan</h2>
    </Layout>
  );
};

export default Home;
