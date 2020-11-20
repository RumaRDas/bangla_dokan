const { Router } = require("express");
const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
} = require("../controllers/product");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth.js");
const { userById } = require("../controllers/user");

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/product/:productId", read);
//remove product by admin user
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
