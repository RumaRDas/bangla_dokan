import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";

const Shop = () => {
  return (
    <Layout
      title="Shop Page"
      description="Search and Find Products of your choices"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">Left SideBar</div>
        <div className="col-8">Right SideBar</div>
      </div>
    </Layout>
  );
};

export default Shop;
