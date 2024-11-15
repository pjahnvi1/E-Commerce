let mongoose = require("mongoose")

let userSch = new mongoose.Schema({
    "_id":String,
    "name":String,
    "phno":Number,
    "pwd":String,
    "add":String,
    "city":String,
    "state":String,
    "zip":String,
    "role":{
        type:String,
        default:"user"
    }
})

let um = mongoose.model("user",userSch)
module.exports = um