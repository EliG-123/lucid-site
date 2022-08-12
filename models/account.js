const mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    joined: {type: Date, default: Date.now()},
    name: String,
    email: String,
    username: String, 
    password: String,
    q1a: String, 
    q2a: String,
    q3a: String,
    q4a: String
})



module.exports = mongoose.model("User", userSchema)