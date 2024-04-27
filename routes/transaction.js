const express = require("express");
const router = express.Router();
const serverless = require("serverless-http");

const {
    getAllTransactions,
    createNewTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    deleteTransactionByRefNo
} = require("../controllers/transactionController");

router
    .route("/")
    .get(getAllTransactions)
    .post(createNewTransaction)
    .delete(deleteTransactionByRefNo);

router
    .route("/:id")
    .get(getTransactionById)
    .put(updateTransaction)
    .delete(deleteTransaction);

module.exports = serverless(router);