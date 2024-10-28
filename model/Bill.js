const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const billSchema = new Schema({
  billNo: { 
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
  paidAmount: {
    type: Number,
  },
  dueAmount: {
    type: Number,
  },
  gst: {
    type: Number,
  },
  totalBillAmount: {
    type: Number,
  },
  gtsPercent: {
    type: Number,
  },
  days: {
    type: Number,
  },
  financialYear: {
    type: String,
  },
});

// billSchema.pre('save', function(next) {
//   const doc = this;
//   Counter.findByIdAndUpdate({_id: 'billId'}, {$inc: { seq: 1 }}, {new: true, upsert: true}, function(error, counter)   {
//     if(error) return next(error);
//     doc.billNo = counter.seq;
//     next();
//   });
// });


module.exports = mongoose.model("Bill", billSchema);