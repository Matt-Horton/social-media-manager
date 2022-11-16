const express = require("express");
const router = express.Router();
const { signUp, signIn, logout, refreshToken } = require("./controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logout);
router.get('/refresh', refreshToken);

module.exports = router;
