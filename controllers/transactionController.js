const Transaction = require('../model/Transaction');

const getAllTransactions = async (req, res) => {
    console.log("getAllTransactions");
    const transactions = await Transaction.find();
    if (!transactions) {
        return res.status(204).json({ message: "No Transaction Found!" });
    }
    console.log(transactions);
    res.json(transactions);
};

const createNewTransaction = async (req, res) => {
    console.log(req.body);
    
    if ( !req?.body?.amount || !req?.body?.date || !req?.body?.companyName || !req?.body?.type) {
        return res
            .status(400)
            .json({ message: "Every feild is required" });;
    }
    const newTransaction = {};
    if (req.body?.transactionID) newTransaction.transactionID = req.body.transactionID;
    if (req.body?.amount) newTransaction.amount = req.body.amount;
    if (req.body?.date) newTransaction.date = req.body.date;
    if (req.body?.companyName) newTransaction.companyName = req.body.companyName;
    if (req.body?.type) newTransaction.type = req.body.type;
    if (req.body?.refNo) newTransaction.refNo = req.body.refNo;

    try{
        const result = await Transaction.create(newTransaction);
        res.status(201).json({ success: true });
    }
    catch(error){
        res.json({ message: error.message });
    }
};

const updateTransaction = async (req, res) => {
    
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const transaction = await Transaction.findOne({ _id: req.params.id }).exec();

    if (!transaction) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    if (req.body?.transactionId) transaction.transactionId = req.body.transactionId;
    if (req.body?.amount) transaction.amount = req.body.amount;
    if (req.body?.date) transaction.date = req.body.date;
    if (req.body?.companyName) transaction.companyName = req.body.companyName;
    if (req.body?.type) transaction.type = req.body.type;
    if (req.body?.refNo) transaction.refNo = req.body.refNo;

    try {
        await transaction.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ message: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const transaction = await Transaction.findOne({ _id: req.params.id }).exec();

    if (!transaction) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    const result = await Transaction.deleteOne({_id : req.params.id}).exec();
    res.json({ success: true, result: result });
};

const getTransactionById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const transaction = await Transaction.findOne({ _id: req.params.id }).exec();

    if (!transaction) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    res.json(transaction);
};

const deleteTransactionByRefNo = async (req, res) => {
    console.log(req.body.refNo);
    if (!req?.body.refNo) {
        return res.status(400).json({ message: "RefNo is required" });
    }

    const transaction = await Transaction.find({ refNo: req.body.refNo }).exec();

    if (!transaction) {
        return res
            .status(204)
            .json({ message: `RefNo: ${req.body.refNo} does not match` });
    }
    
    const result = await Transaction.deleteMany({ refNo: req.body.refNo }).exec();
    res.json({ success: true, result: result });
};

module.exports = { getAllTransactions, createNewTransaction, updateTransaction, deleteTransaction, getTransactionById, deleteTransactionByRefNo };