const Expense = require("../model/Expense");

const getAllExpenses = async (req, res) => {
    const expenses = await Expense.find();
    console.log(expenses);
    if (!expenses) {
        return res.status(204).json({ message: "No Expense Found!" });
    }
    res.json(expenses);
};

const createNewExpense = async (req, res) => {
    console.log(req.body);
    if (!req?.body?.expenseNo || !req?.body?.companyName) {
        return res
            .status(400)
            .json({ message: "ExpenseNo and companyName are required" });
    }
    const newExpense = {};
    if (req.body?.expenseNo) newExpense.expenseNo = req.body.expenseNo;
    if (req.body?.companyName) newExpense.companyName = req.body.companyName;
    if (req.body?.productDetails) newExpense.productDetails = req.body.productDetails;
    if (req.body?.date) newExpense.date = req.body.date;
    if (req.body?.amount) newExpense.amount = req.body.amount;
    if (req.body?.gst) newExpense.gst = req.body.gst;
    if (req.body?.totalBillAmount) newExpense.totalBillAmount = req.body.totalBillAmount;
    if (req.body?.paidAmount) newExpense.paidAmount = req.body.paidAmount;
    newExpense.dueAmount = req.body.dueAmount;
    if (req.body?.gtsPercent) newExpense.gtsPercent = req.body.gtsPercent;
    console.log("New Expense",newExpense);

    try {
        const result = await Expense.create(newExpense);
        res.status(201).json({ success: true });
    } catch (error) {
        res.json({ message: error.message });
    }
};

const updateExpense = async (req, res) => {
    
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const expense = await Expense.findOne({ _id: req.params.id }).exec();
    console.log("Expense",expense);
    if (!expense) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    if (req.body?.expenseNo) expense.expenseNo = req.body.expenseNo;
    if (req.body?.companyName) expense.companyName = req.body.companyName;
    if (req.body?.productDetails) expense.productDetails = req.body.productDetails;
    if (req.body?.date) expense.date = req.body.date;
    if (req.body?.amount) expense.amount = req.body.amount;
    if (req.body?.gst) expense.gst = req.body.gst;
    if (req.body?.totalBillAmount) expense.totalBillAmount = req.body.totalBillAmount;
    if (req.body?.paidAmount) expense.paidAmount = req.body.paidAmount;
    expense.dueAmount = req.body.dueAmount;
    if (req.body?.gtsPercent) expense.gtsPercent = req.body.gtsPercent;

    const result = await expense.save();
    res.json({ success: true, result: result });
};

const deleteExpense = async (req, res) => {
    console.log("Delete called");

    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const expense = await Expense.findOne({ _id: req.params.id }).exec();

    if (!expense) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    const result = await Expense.deleteOne({ _id: req.params.id });
    res.json({ success: true, result: result });
};

const getExpenseById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const expense = await Expense.findOne({ _id: req.params.id }).exec();

    if (!expense) {
        return res
            .status(204)
            .json({ message: `ID: ${req.params.id} does not match` });
    }

    res.json(expense);
};

module.exports = {
    getAllExpenses,
    createNewExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
  };