const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  expenseNo: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  productDetails: {
    type: String,
  },
  date: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  gst: {
    type: Number,
  },
  totalBillAmount: {
    type: Number,
  },
  paidAmount: {
    type: Number,
  },
  dueAmount: {
    type: Number,
  },
  gtsPercent: {
    type: Number,
  },
});

module.exports = mongoose.model("Expence", expenseSchema);