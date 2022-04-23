const jwt = require('jsonwebtoken');
const userService = require('../services/userService')


const validateToken = async (req, res, next) => {

    try {

        const accessToken = await req.headers.authorization;
        Token = accessToken.split(" ");    // 추후 삭제 확인 // postman 에서 Baerer Token 형식으로 들어와서 만듬
        realToken = Token[1]

        if (!realToken || realToken === "null" || realToken === undefined) {
            throw await res.status(400).json({ message: 'UNDEFINED_TOKEN' })
        }

        const { userId } = jwt.verify(realToken, process.env.SECRET_KEY);

        if (!userId) {
            throw await res.status(400).json({ message: 'INCORRECT_TOKEN' })
        }

        const findUser = await userService.getUserInfo(userId);
        user = findUser[0].email

        if (!user === userId) {
            throw await res.status(404).json({ message: 'USER_NOT_FOUND' })
        }

        next();
        
    } catch (err) {
        return res.status(err.statuscode || 500).json({ message: err.message });
    }
}




module.exports = { validateToken }