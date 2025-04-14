const express = require('express') ; 

const mongoose = require('mongoose');
const user = require('../models/User') ; 
const {verifyToken}=require('../middleWare/usermiddleware');
const{register , login }=require('../controllers/authController') ; 
const{profile}=require('../controllers/profileController') ; 
const {loginValidation ,registerValidation} =require('../validation/userValidetor') ;
const router =express.Router (); 




router.post('/register',registerValidation ,register);

router.post('/login', loginValidation,login)

router.get('/profile',verifyToken,profile)

module.exports = router ; 