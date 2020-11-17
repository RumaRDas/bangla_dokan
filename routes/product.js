const { Router } = require("express");
const express = require("express");
const router = express.Router();

const { create, productById } = require("../controllers/product");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth.js");
const { userById } = require("../controllers/user");

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
