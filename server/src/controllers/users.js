const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req,res)=>{
   const {email,password} = req.body;
   try {
        const hashed = await bcrypt.hash(password,10);
        const newUser = {...req.body,password:hashed}

        const savedUser = await User.create(newUser);
        const token = savedUser.createJWT();
        res.status(201).json({user:{firstname:savedUser.firstName},token:token});

   } catch (error) {
        console.log('An error occurred:',error);
        res.status(500).json({msg:'Server Error'});
   }
}

module.exports = {registerUser};