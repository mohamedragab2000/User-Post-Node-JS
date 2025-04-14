const mongoose = require('mongoose');
const user = require('../models/User') ;
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

const register = async(req ,res)=>{
    try{
        const{email ,name ,password,role} =  req.body ;
        const hasPassword = await bcrypt.hash(password , 10) 
        newUser= await user.create({email ,name ,password:hasPassword,role}) ;
        res.send(newUser);
    }catch(err){
        res.status(500).send({ error: err.message });
    }
 
}

const login = async(req,res)=>{
    try{
        const{email ,password } =  req.body ;
        
        if (!email || !password){
            return res.status(400).send("Email and password are required.");

        }
        const selectUser= await user.findOne({email}).select('+password') ; 

        if(!selectUser){
            return res.status(400).send("user not founded");
        }
        const isMatch = await bcrypt.compare(password, selectUser.password);

        if (!isMatch) {
            return res.status(401).send("Incorrect password.");
        }
        const token = jwt.sign(
            { id: selectUser._id, email: selectUser.email ,  role: selectUser.role},
            'myscret',
            { expiresIn: "1h" }
          );

        res.status(200).send({
                    token:token , 
                    message: "Login successful",
                    user: {
                        id: selectUser._id,
                        email: selectUser.email,
                        name: selectUser.name
                    }
                });
    }catch(err){
        res.status(500).send({ error: err.message });
    }
}

module.exports={register , login }