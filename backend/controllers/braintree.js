const User = require("../models/user");
const braintree = require("braintree");
require("dotenv").config();

var gatway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, //production
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTRE_PRIVATE_KEY,
});

exports.generateToken = (req, res) => {
  gatway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};
