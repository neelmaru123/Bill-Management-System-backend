require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const path = require("path");
// const handleNewUser = require("./controllers/signupController");
const handleLogin = require("./controllers/loginController");

const cors = require("cors");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");
const Bill = require("./model/Bill");
const PORT =  3500;

//connect to mongoDB
connectDB();

//cross-origin resource sharer
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const { sendOTP } = require('./controllers/emailController');
const { log } = require("console");
app.post('/sendOTP', sendOTP);


app.use("/", express.static(path.join(__dirname, "public")));




mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

billRoute = require("./routes/bill");
expenceRoute = require("./routes/expense");
transactionRoute = require("./routes/transaction");
loginRoute = require("./routes/login");

app.use("/bill", billRoute);
app.use("/expense", expenceRoute);
app.use("/transaction", transactionRoute);
app.use("/", loginRoute);

// const userRoute = require("./routes/user.routes");

// app.use("/user", userRoute);
