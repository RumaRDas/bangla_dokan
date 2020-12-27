const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth.js");
const { userById } = require("../controllers/user");
const { create } = require("../controllers/order");

router.post("/order/create/:userId", requireSignin, isAuth, create);
router.param("userId", userById);

module.exports = router;
