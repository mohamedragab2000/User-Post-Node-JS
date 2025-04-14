const express = require('express');
const path = require('path'); 
const morgan = require('morgan') ;
const mongoose = require('mongoose');
const fs = require('fs') ; 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/*--------------------------------------*/
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const authRoutes = require('./routes/authRoute');

app.use('/api/posts' , postRoutes) ; 
app.use('/user' , userRoutes) ; 
app.use('/auth' , authRoutes) ; 
app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        message: 'Route not found',
    });
});


app.use((err, req, res, next) => {
    console.log('error', err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message || 'Internal Server Error',
        errors: err.errors || []
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/UserPosts').then(()=>{
  console.log('connect to db')
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });