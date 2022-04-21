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



const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await userService.signIn(email, password)
        return res.status(200).json({ message: 'LOGIN_SUCCESS', jwt: token })
    } catch (err) {
        console.log(err);
        return res.status(err.statuscode || 500).json({ message: err.message });
    }
}



module.exports = {
    signUp,
    signIn
};