let mongoose=require("mongoose")

let cartSch = new mongoose.Schema({
    "_id":String,
    "uid":String,
    "pid":String,
    "name":String,
    "price":Number,
    "qty":Number,
    "pimg":String
})

let cm = mongoose.model("prodCart",cartSch)
module.exports = cm