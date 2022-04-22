const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRET_KEY;

const validateToken = async (req, res, next) => {
    try {
        const clientToken = req.headers.authorization;
        const decypt = jwt.verify(clientToken, SECRETKEY);
        console.log(decypt)

    } catch (err) {
        res.status(401).json({ error: 'TOKEN_EXPIRE' })
    }
    next();
}

module.exports = { validateToken }