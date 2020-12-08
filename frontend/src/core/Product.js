import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apicor";
import Card from "./Card";

const Product = () => {
  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce App"
      className="container-fluid"
    >
      <h2>Product page</h2>
    </Layout>
  );
};

export default Product;
