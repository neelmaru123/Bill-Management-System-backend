const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionID: {
        type: String,
        required: true, 
    },
    amount: {
        type: Number,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    refNo: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Transaction", transactionSchema);