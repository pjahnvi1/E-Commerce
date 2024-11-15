let express = require("express")
let {add,getProd,upload, addcom} = require("../controllers/prodCont")
let {addCart,getCart, inc, dec, del} = require("../controllers/cartCont")

let pr = new express.Router()
pr.post("/add",upload.single('pimg'),add)
pr.get("/getProd",getProd)
pr.post("/addCart",addCart)
pr.get("/getCart/:uid",getCart)
pr.get("/inc/:cid",inc)
pr.get("/dec/:cid",dec)
pr.delete("/del/:cid",del)
pr.put("/addcom",addcom)
module.exports = pr