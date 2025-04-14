
const mongoose = require('mongoose');
const user = require('../models/User') ;
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

const getAllUsers =async (req, res,next) => {
    try {
     const users = await user.find() ; 
        res.send(users) ;
        
    }catch(err){
        res.status(500).send({ error: err.message });
    } 
}

const getUserByID= async(req, res) => {
    try{
    const {id} = req.params ; 
     userdata =await user.findById(id); 
     if(!userdata){
        return  res.status(404).send({ "message" : "not founed"});
     }
     res.send(userdata) ; 
    }catch(err){
        res.status(500).send({ error: err.message });
    }
}


const updateUserByID =async(req ,res)=>{
    try{
        const {id} = req.params ; 
        updatedData= await user.findByIdAndUpdate(id , req.body,{new:true}); 
        if(!updatedData){
            return  res.status(404).send({ "message" : "not founed"});
        }
        res.send(updatedData)
    }catch(err){
        res.status(500).send({ error: err.message });
    }
   
}

const deleteUserByID =async(req ,res)=>{
    try{
        const {id} = req.params ;   
        deletedData= await user.findByIdAndDelete(id ); 
        if(!deletedData){
            return  res.status(404).send({ "message" : "not founed"});
        }
        res.send({ message: 'User deleted successfully' });
    }catch(err){
        res.status(500).send({ error: err.message });
    }
   
}


module.exports={getAllUsers , getUserByID ,updateUserByID ,deleteUserByID}