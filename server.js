const express = require('express');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();


connectDB();
const app = express();
const port =process.env.PORT || 5000;

app.use(express.json(URL));//we need a middleware to parse the json data from the client side
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.get('/', (req, res) => {
  return res.status(201).json({ msg: "Server is Live!!🚀" })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

