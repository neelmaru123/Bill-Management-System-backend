
const Bill = require("../model/Bill");

const getAllBills = async (req, res) => {
    console.log("getAllBills");
    const bills = await Bill.find();
    if (!bills) {
        return res.status(204).json({ message: "No Bill Found!" });
    }
    res.json(bills);
};

const createNewBill = async (req, res) => {
    console.log(req.body);
    if (!req?.body?.billNo || !req?.body?.companyName) {
        return res
            .status(400)
            .json({ message: "BillNo and companyName is required" });;
    }
    const newBill = {};
    if (req.body?.billNo) newBill.billNo = req.body.billNo;
    if (req.body?.companyName) newBill.companyName = req.body.companyName;
    if (req.body?.productDetails) newBill.productDetails = req.body.productDetails;
    if (req.body?.date) newBill.date = req.body.date;
    if (req.body?.totalBillAmount) newBill.totalBillAmount = req.body.totalBillAmount;
    if (req.body?.gst) newBill.gst = req.body.gst;
    if (req.body?.amount) newBill.amount = req.body.amount;
    if (req.body?.paidAmount) newBill.paidAmount = req.body.paidAmount;
    if (req.body?.dueAmount) newBill.dueAmount = req.body.dueAmount;
    if (req.body?.gtsPercent) newBill.gtsPercent = req.body.gtsPercent;
    if (req.body?.financialYear) newBill.financialYear = req.body.financialYear;


    try {
        const result = await Bill.create(newBill);
        res.status(201).json({ success: true });
    } catch (error) {
        res.json({ message: error.message });
    }
};

const updateBill = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const bill = await Bill.findOne({ _id: req.params.id }).exec();
    console.log(req.body)
    

    if (!bill) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    if (req.body?.billNo) bill.billNo = req.body.billNo;
    if (req.body?.companyName) bill.companyName = req.body.companyName;
    if (req.body?.productDetails) bill.productDetails = req.body.productDetails;
    if (req.body?.date) bill.date = req.body.date;
    if (req.body?.totalBillAmount) bill.totalBillAmount = req.body.totalBillAmount;
    if (req.body?.gst) bill.gst = req.body.gst;
    if (req.body?.amount) bill.amount = req.body.amount;
    if (req.body?.paidAmount) bill.paidAmount = req.body.paidAmount;
    bill.dueAmount = req.body.dueAmount;
    if (req.body?.gtsPercent) bill.gtsPercent = req.body.gtsPercent;
    if (req.body?.days) bill.days = req.body.days;
    if (req.body?.financialYear) bill.financialYear = req.body.financialYear;

    const result = await bill.save();
    res.json({ success: true, result: result });
};

const deleteBill = async (req, res) => {
    console.log(req.params.id)
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const bill = await Bill.findOne({ _id: req.params.id }).exec();

    if (!bill) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    const result = await bill.deleteOne({_id : req.params.id}).exec();
    res.json({ success: true, result: result });
};

const getBillById = async (req, res) => {
    console.log("getBillById");
    
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const bill = await Bill.findOne({ _id: req.params.id }).exec();

    if (!bill) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    res.json(bill);
};

module.exports = {
    getAllBills,
    createNewBill,
    updateBill,
    deleteBill,
    getBillById,
  };
  