import React from "react";
import Layout from "../core/Layout";
import { API } from "../config";

const Signup = () => {
  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input typr="text" className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input typr="email" className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input typr="password" className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    );
  };

  return (
    <Layout
      title="SignUp Page"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
