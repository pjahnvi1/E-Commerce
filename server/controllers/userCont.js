const um = require("../models/userModel")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")

let add = async(req,res)=>{
    try{
        let obj = await um.findById({"_id":req.body._id})
        if(obj){
            res.json({"msg":"Already registered."})
        }
        else{
            let hash = await bcrypt.hash(req.body.pwd,10)
            let data = new um({...req.body,"pwd":hash})
            await data.save()
            res.json({"msg":"Account Created"})
        }
    }
    catch(err){
        res.json({"msg":"Error in Registration"})
    }
}

let login = async(req,res)=>{
    try{
        let user = await um.findById({"_id":req.body._id})
        if(user){
            let f = await bcrypt.compare(req.body.pwd,user.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":user._id},"abcd"),"_id":user._id,"name":user.name,"role":user.role})
            }
            else{
                res.json({"msg":"Check Password"})
            }
        }
        else{
            res.json({"msg":"Check User ID"})
        }
    }
    catch(err){
        res.json({"msg":"Error in logging"})
    }
}

let islogin = async(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"abcd")
        next()
    }
    catch(err){
        res.json({"msg":"Please Login "})
    }
}

let isauth = async(req,res,next)=>{
    try{
        let obj = await um.findById({"_id":req.headers._id})
        if(obj.role == "admin")
        {
            next()
        }
        else{
            res.json({"msg":"You are not a admin"})
        }
    }
    catch(err){

    }
}

module.exports = {add,login,islogin,isauth}