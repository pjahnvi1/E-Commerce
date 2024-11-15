let mongoose = require("mongoose")

let prodSch = new mongoose.Schema({
    "_id":String,
    "name":String,
    "cat":String,
    "price":Number,
    "desc":String,
    "comm":[],
    "pimg":String
})

let pm = mongoose.model("prod",prodSch)
module.exports = pm