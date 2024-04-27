const express = require("express");
const router = express.Router();
const serverless = require("serverless-http");

const {
    getAllExpenses,
    createNewExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
} = require("../controllers/ExpenseController");

router
  .route("/")
  .get(getAllExpenses)
  .post(createNewExpense);

router
  .route("/:id")
  .get(getExpenseById)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = serverless(router);
