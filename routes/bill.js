const express = require("express");
const router = express.Router();

const {
    getAllBills,
    createNewBill,
    updateBill,
    deleteBill,
    getBillById,
} = require("../controllers/billController");


router
  .route("/")
  .get(getAllBills)
  .post(createNewBill);

router
  .route("/:id")
  .get(getBillById)
  .put(updateBill)
  .delete(deleteBill);
  
module.exports = router;
