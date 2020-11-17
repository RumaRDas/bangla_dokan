const express = require("express");
const router = express.Router();

const { create } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth.js");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("userId", userById);

module.exports = router;