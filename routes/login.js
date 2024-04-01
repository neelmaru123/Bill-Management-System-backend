const express = require("express");
const router = express.Router();

const {
    handleLogin,
    changePassword
} = require("../controllers/loginController");

router
    .route("/login")
    .post(handleLogin);

router
    .route("/changePassword")
    .post(changePassword);

module.exports = router;