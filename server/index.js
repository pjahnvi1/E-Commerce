let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let bodyParser = require("body-parser")

let ur = require("./routes/userRoute")
let pr = require("./routes/prodRoute")

let app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use("/prodimgs",express.static("./prodimgs"))
mongoose.connect("mongodb://127.0.0.1:27017/ecom").then((res)=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})

app.use("/",ur)
app.use("/",pr)

app.listen(5000)