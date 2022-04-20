const userService = require('../services/userService')
require('dotenv').config();



const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        await userService.signUp(username, email, password);

        res.status(201).json({ message: 'SIGNUP_SUCCESS' })

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}




module.exports = {
    signUp
};