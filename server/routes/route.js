
const express=require('express');
const route=express.Router();

route.get('/alwasy',(req,res)=>{
    res.status(200).json({
        msg:'well come new route'
    })
})


module.exports=route;