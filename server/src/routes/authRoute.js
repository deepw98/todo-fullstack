const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const {userLogin} = require('../controllers/userLogin');

// router.route('/').post(asyncHandler(userLogin));
router.post('/',asyncHandler(userLogin));

module.exports = router;