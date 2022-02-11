const mongoose = require('mongoose')

// user schema
const userSchema = new mongoose.Schema({
    emailId: String,
    userName: {type:String, unique:true},
    password: String,
    token: Array,
})
const User = mongoose.model("User", userSchema);

module.exports = User;