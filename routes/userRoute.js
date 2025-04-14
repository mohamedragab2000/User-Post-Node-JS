const express = require('express') ; 

const mongoose = require('mongoose');
const user = require('../models/User') ; 
const {verifyToken}=require('../middleWare/usermiddleware');

const {getAllUsers , getUserByID  ,updateUserByID ,deleteUserByID} = require("../controllers/userController")

const router =express.Router (); 

router.get('/',getAllUsers);

router.get('/:id', getUserByID);



router.put('/:id' ,updateUserByID)

router.delete('/:id' ,deleteUserByID)


module.exports = router ; 