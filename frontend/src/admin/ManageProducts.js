import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  return (
    <Layout
      title="Manage Products"
      description="Perform CURD on products"
      className="container-fluid"
    >
      <div classnName="row">
        <div> Manage Products</div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
