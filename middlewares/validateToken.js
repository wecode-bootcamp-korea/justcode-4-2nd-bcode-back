const jwt = require('jsonwebtoken');
const userService = require('../services/userService')


const validateToken = async (req, res, next) => {

    try {

        const { token } = await req.headers;

        if (!token || token === "null" || token === undefined) {
            throw await res.status(400).json({ message: 'UNDEFINED_TOKEN' })
        }

        const { email } = jwt.verify(token, process.env.SECRET_KEY);

        if (!email) {
            throw await res.status(400).json({ message: 'INCORRECT_TOKEN' })
        }

        const findUser = await userService.getUserInfo(email);
        id = findUser[0].id

        if (!findUser || findUser === "null" || findUser === undefined) {
            throw await res.status(404).json({ message: 'USER_NOT_FOUND' })
        }

        next(id);

    } catch (err) {
        return res.status(err.statuscode || 500).json({ message: err.message });
    }
}




module.exports = { validateToken }