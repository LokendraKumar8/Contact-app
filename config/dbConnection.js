const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      // console.log(process.env.CONNECTION_STRIN);
      const connect = await mongoose.connect(process.env.URL);
      console.log("Database connected:");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  module.exports = connectDB;     