const express = require("express");
const router = express.Router();
const serverless = require("serverless-http");

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

module.exports = serverless(router);