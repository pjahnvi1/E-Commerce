let pm = require("../models/prodModel")
let multer = require("multer")
let {v4:uuidv4} = require("uuid")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './prodimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })

let add = async(req,res)=>{
    try{
        let data = new pm({...req.body,"pimg":req.file.filename,"_id":uuidv4()})
        await data.save()
        res.json({"msg":"Product Added"})
    }
    catch(err){
        res.json({"msg":"Error in adding Product"})
    }
}

let getProd = async(req,res)=>{
    try{
        let data = await pm.find()
        res.json(data)
    }
    catch(err){
        res.json({"msg":"Error in getting Product"})
    }
}

let addcom = async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body.pid},{$push:{"comm":req.body}})
        let data = await pm.findById({"_id":req.body.pid})
        res.json(data)
    }
    catch(err){
        res.json({"msg":"Error in adding comment"})
    }
}

module.exports = {add,getProd,upload,addcom}