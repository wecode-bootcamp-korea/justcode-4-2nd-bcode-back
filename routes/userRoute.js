const express = require('express');
const router = express.Router();

const validateToken = require('../middlewares/validateToken');
const validateForm = require('../middlewares/validateForm');
const userController = require('../controllers/userController');

router.post('/verify', validateToken.validateToken);
router.post('/signup', validateForm.validateSignUp, userController.signUp);
router.post('/signin', validateForm.validateSignIn, userController.signIn);

module.exports = router;
