const express = require('express') ; 

const mongoose = require('mongoose');
const user = require('../models/User')
const post = require('../models/Post') ; 

const{getAllPosts,getPostById, addPost ,updatePost,deletePost, commentPostAdd } =require('../controllers/postController') ; 
const { postCreateValidetor , postUpdateValidetor } = require('../validation/postValidetor');
const {verifyToken}=require('../middleWare/usermiddleware');
const{authorize} = require('../middleWare/roleBasedMiddleWare') ; 
const router =express.Router (); 


router.get('/admin-only', verifyToken, authorize('admin'), getAllPosts);

router.get('/:id', getPostById);

router.post('/' ,postCreateValidetor,addPost) ; 


router.put('/:id' ,verifyToken,postUpdateValidetor,updatePost )

router.delete('/:id' ,verifyToken,deletePost)

router.post('/:id/comments' ,commentPostAdd);




module.exports = router ; 