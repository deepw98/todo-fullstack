const {BadRequestError,UnauthenticatedError} = require('../errors');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const userLogin = async (req,res)=>{
    const {email,password} = req.body;
    
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid email');
        // res.status(401).json({msg:'Invalid email'});
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid password');
        // res.status(401).json({msg:'Invalid password'});
    }
    const token = user.createJWT();
    res.status(200).json({user:{firstName:user.firstName},token});
    
}

module.exports={userLogin};