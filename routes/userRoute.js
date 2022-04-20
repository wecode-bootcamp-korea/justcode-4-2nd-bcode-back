const express = require("express");
const router = express.Router();

const middleware = require("../middlewares/validateForm")
const userController = require("../controllers/userController")



router.post('/signup', middleware.validateForm, userController.signUp);
router.post('/signin', userController.login);


module.exports = router;