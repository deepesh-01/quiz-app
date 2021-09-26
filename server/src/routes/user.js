
const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.route('/').get(User.index);

router.post("/verifyuser", User.jwtVerify)

router.put('/update', User.update);

module.exports = router;