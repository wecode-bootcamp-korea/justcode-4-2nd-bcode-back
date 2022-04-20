const userDao = require("../models/userDao");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp = async (username, email, password) => {

    const user = await userDao.getUserInfo(email)
    if (user.length !== 0) {
        const error = new Error('EXISTING_EMAIL')
        error.statusCode = 409
        throw error
    }

    const encryptedPW = bcrypt.hashSync(password, bcrypt.genSaltSync())
    const newUser = await userDao.createuUser(username, email, encryptedPW)
    return newUser

}



module.exports = {
    signUp

}