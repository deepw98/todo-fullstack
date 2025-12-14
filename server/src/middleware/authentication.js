const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const asyncHandler = require('express-async-handler');

const auth = asyncHandler(async(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Invalid authentication:Missing Token');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token,'Your_JWT_secret');
        req.authData = {userId:payload.userId,email:payload.email};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Invalid Token');
    }
   
})

module.exports=auth;