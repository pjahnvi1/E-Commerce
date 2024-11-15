let express = require("express")
let {add,login} = require("../controllers/userCont")

let ur = new express.Router()
ur.post("/reg",add)
ur.post("/login",login)

module.exports = ur