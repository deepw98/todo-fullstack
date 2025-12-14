const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const {registerUser} = require('../controllers/users');

router.route('/').post(asyncHandler(registerUser));

module.exports = router;