require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUsername = encodeURIComponent(process.env.DB_USERNAME);
    const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
    const dbCluster = process.env.DB_CLUSTER;
    const dbUri = `mongodb+srv://neelmaru63:neelmaru63@cluster0.ewl7mj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(dbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error', err);
  }
};

module.exports = connectDB;
