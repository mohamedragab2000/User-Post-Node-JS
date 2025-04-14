const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/User');
const post = require('../models/Post');

const profile = async (req, res, next) => {
    try {
        const userId = req.user.id;

       
        const myPosts = await post.find({ author: userId });

        if (!myPosts || myPosts.length === 0) {
            return res.status(200).send({ message: "You have not added any posts." });
        }

        res.status(200).send({
            message: "Your posts:",
            posts: myPosts
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = { profile };
