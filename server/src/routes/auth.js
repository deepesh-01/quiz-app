const express = require('express');
const {check} = require('express-validator');
const Auth = require('../controllers/auth');
const validate = require('../middlewares/validator');

const router = express.Router();

router.get('/',(req,res)=>{
    return res.status(200).json({message:"You are in Auth endpoint. Register or Login to test Auth"});
});

router.post('/register',[
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('firstName').not().isEmpty().withMessage('You first name is required'),
    check('lastName').not().isEmpty().withMessage('You last name is required'),
],validate, Auth.register);

router.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], validate, Auth.login);

module.exports = router;