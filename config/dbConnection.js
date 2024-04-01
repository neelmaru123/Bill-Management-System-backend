require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://neelmaru63:neelmaru63@cluster0.ewl7mj7.mongodb.net/?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error', err);
  }
};

module.exports = connectDB;
