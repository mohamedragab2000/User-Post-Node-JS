
const mongoose = require('mongoose');
const {Schema} = mongoose   ; 

const userSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
      },
    name:{
        type: String ,
        trim: true,
    } , 
    password :{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'], 
        select : false 
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    }
   
   },
    {
        timestamps: true
    
});

userSchema.pre('save', async function( ) {
    console.log('Try To Add New user .....'); 

  });

  userSchema.post('save', async function() {
    const name = this.name ; 
    await new Promise(resolve => setTimeout(resolve, 10000)); 
    console.log(`Done , New ${name} is Added `); 
    
  });
module.exports = mongoose.model('User', userSchema);