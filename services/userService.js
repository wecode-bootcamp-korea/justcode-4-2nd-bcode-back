const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (username, email, password) => {
    const user = await userDao.getUserInfo(email);
    if (user.length !== 0) {
        const error = new Error('EXISTING_EMAIL');
        error.statusCode = 409;
        throw error;
    }

    const encryptedPW = bcrypt.hashSync(password, bcrypt.genSaltSync());
    const newUser = await userDao.createUser(username, email, encryptedPW);
    return newUser;
};

const signIn = async (email, password) => {
    const userInfo = await userDao.getUserInfo(email);
    if (userInfo.length === 0) {
        const error = new Error('INVALID_USER');
        error.statusCode = 400;
        throw error;
    }

    const isCorrect = bcrypt.compareSync(password, userInfo[0].password);

    if (!isCorrect) {
        const error = new Error('INVALID_USER');
        error.statusCode = 400;
        throw error;
    }

    return {
        id: userInfo[0].id,
        username: userInfo[0].username,
        token: jwt.sign({ email: userInfo[0].email }, process.env.SECRET_KEY),
    };
};

const getUserInfo = async email => {
    return await userDao.getUserInfo(email);
};

module.exports = {
    signUp,
    signIn,
    getUserInfo,
};
