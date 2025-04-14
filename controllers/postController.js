const express = require('express') ; 
const mongoose = require('mongoose');
const user = require('../models/User')
const post = require('../models/Post') ; 


const getAllPosts =async (req, res,next) => {
    try {

        if (!req.query.title && !req.query.content){
            let page = parseInt(req.query.page) || 1; 
            let limit = parseInt(req.query.limit) || 4;
            const pass = (page-1)*limit ; 
     
            const posts = await post.find().skip(pass).limit(limit) ; 
               res.send(posts) ;
        }
        else {
            const {title ,content} = req.query ; 

            let query = {};
    
            if (title) {
                query.title = { $regex: title, $options: 'i' }; 
            }
            if (content) {
                query.title = { $regex: title, $options: 'i' }; 
            }
            const posted = await post.find(query);
            res.send(posted) ; 
        }
        
    }catch(err){
            next(err)
    } 
} ; 

const getPostById =async(req, res ,next) => {
    try{
    const {id} = req.params ; 
     postData =await post.findById(id); 
     if(!postData){
        const error = new Error("Post not found");
        error.statusCode = 404;  
        return next(error);
     }
     res.send(postData) ; 
    }catch(err){
      
        next(err)
    }
}

const addPost =async(req ,res ,next)=>{
    try{
        const{title ,content ,author , tags} =  req.body ; 
        newpost= await post.create({title ,content ,author , tags }) ;
        res.send(newpost);
    }catch(err){
        next(err)
    }
 
}

const updatePost = async(req ,res ,next)=>{
    try{
        const { id } = req.params;

        const selectedPost = await Post.findById(id);
        if (!selectedPost) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        console.log(selectedPost.author.toString());
        console.log(selectedPost.author.toString())
        console.log( req.user.id) ;
        console.log(req.user.role); 
    
        if (selectedPost.author.toString() !== req.user.id && req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Unauthorized to update this post' });
        }
   
      const updatedPost= await post.findByIdAndUpdate(id , req.body,{new:true}); 
        if(!updatedPost){
            const error = new Error("Post not found");
            error.statusCode = 404;  
            return next(error);
        }
        res.send(updatedPost)
    }catch(err){
       next(err)
    }
   
}
const Post = require('../models/Post'); 

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const selectedPost = await Post.findById(id);
    if (!selectedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log(selectedPost.author.toString());
    console.log(selectedPost.author.toString())
    console.log( req.user.id) ;
    console.log(req.user.role); 

    if (selectedPost.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post deleted successfully' });

  } catch (err) {
    next(err);
  }
};


const commentPostAdd =async(req ,res,next)=>{
    try{
        const {id} = req.params ; 
       const{text , author} = req.body ;
       const postdata = await post.findById(id);
       if (!postdata) {
        const error = new Error("Post not found");
        error.statusCode = 404;  
        return next(error);
    }
    const newComment = {
        text,
        author,  
        date: new Date(),
    };
    postdata.comments.push( newComment) ; 

    await postdata.save() ; 


        res.end("comment is added") ; 

    }catch(err){
      next(err) ;
    }
}; 

module.exports ={getAllPosts ,getPostById,addPost ,updatePost ,deletePost ,commentPostAdd}