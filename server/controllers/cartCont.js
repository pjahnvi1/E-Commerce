const { deleteModel } = require("mongoose")
const cm = require("../models/cartModel")
let {v4:uuidv4}=require("uuid")

let addCart = async(req,res)=>{
    try
    {
        let data = await cm.find({"uid":req.body.uid,"pid":req.body.pid})
        if(data.length==0)
        {
            let cdata=new cm({...req.body,"_id":uuidv4()})
            await cdata.save()
            res.json({"msg":"Product added to cart"})

        }
        else{
           await cm.findByIdAndUpdate({"_id":data[0]._id},{$inc:{"qty":1}})
           res.json({"msg":"product updated in cart"})
        }

    }
    catch(err)
    {
        res.json({"msg":"Error in adding cart"})
    }

}
let getCart = async(req,res)=>{
    try
    {
        let data = await cm.find({"uid":req.params.uid})
        res.json(data)
    }
    catch(err)
    {
        res.json({"msg":"Error in fetching cart"})
    }

}

let inc = async(req,res)=>{
    try{
        await cm.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":1}})
        res.json({"msg":"Increment done"})
    }
    catch(err){
        res.json({"msg":"Error in increment"})
    }
}

let dec = async(req,res)=>{
    try{
        await cm.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":-1}})
        res.json({"msg":"Decrement done"})
    }
    catch(err){
        res.json({"msg":"Error in decrement"})
    }
}

let del = async(req,res)=>{
    try{
        await cm.findByIdAndDelete({"_id":req.params.cid})
        res.json({"msg":"Delete product successfully"})
    }
    catch(err){
        res.json({"msg":"Error in delete"})
    }
}

module.exports={addCart,getCart,inc,dec,del}