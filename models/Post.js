const mongoose = require('mongoose');
const user =require('../models/User')
const {Schema} = mongoose   ; 

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
})

const postSchema = new Schema({
    title:{
        type: String ,
        required: true,
        trim: true
    } , 
    content:{
        type: String ,
        trim: true
    } ,
    author:{
        type: Schema.Types.ObjectId,
        ref :'User' , 
        required :true
    } ,
    tags:[{
        type:String , 
        trim : true
    } ], 
    comments :[commentSchema] 
    
   },
    {
        timestamps: true
    
});
postSchema.pre('save', async function( ) {
  console.log('Try To Add New Post .....'); 

});

postSchema.post('save', async function() {
  const userdata = await user.findById(this.author);
  await new Promise(resolve => setTimeout(resolve, 10000)); 
  console.log(`Done , New post is Added by ${userdata.name} `); 
  
});

module.exports = mongoose.model('Post', postSchema);