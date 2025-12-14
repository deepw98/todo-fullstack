const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:[20,'maximum characters can only be 20'],
    },

    lastName:{
        type:String,
        required:true,
        trim:true,
        maxlength:[20,'maximum characters can only be 20'],
    },

    email:{
        type:String,
        required:[true,'must provide email'],
        trim:true,
        unique:true,
    },

    password:{
        type:String,
        required:[true,'must provide password'],
        trim:true,
        unique:true,
    }
})

User.methods.createJWT = function(){
    return jwt.sign(
       { userId:this._id,email:this.email},
       'Your_JWT_secret',
       {
        expiresIn:'30d',
       }
    )
}

module.exports = mongoose.model('User',User);