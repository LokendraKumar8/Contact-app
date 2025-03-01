const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add the user name"],
    },
    email: {
        type: String,
        required: [true,"Please add the user email"],
        unique: [true,"This email is already registered"],  
    },
    password: {
        type: String,
        required: [true,"Please add the user password"],
    },    
},{
    timestamps: true,
});   
       
module.exports = mongoose.model("User", userSchema);//This will automatically add createdAt and updatedAt fields to the documents.