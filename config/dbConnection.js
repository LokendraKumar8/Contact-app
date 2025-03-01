const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      // console.log(process.env.CONNECTION_STRIN);
      const connect = await mongoose.connect("mongodb+srv://lokendrakumar582809:Lokendra456@cluster0.oey3g.mongodb.net/mycontacts-backend?retryWrites=true&w=majority&appName=Cluster0");
      console.log("Database connected:", connect.connection.host,connect.connection.name);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  module.exports = connectDB;     