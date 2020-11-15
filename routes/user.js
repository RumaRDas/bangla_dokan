const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth.js");
const { userById } = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", userById);

module.exports = router;
