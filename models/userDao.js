const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserInfo = async email => {
    return await prisma.$queryRaw`
		SELECT id, email, password, username 
        FROM users 
        WHERE email = ${email};
	`;
};

const createUser = async (username, email, encryptedPW) => {
    return await prisma.$queryRaw`
        INSERT INTO users(username, email, password) 
        VALUES (${username}, ${email}, ${encryptedPW});
    `;
};

module.exports = {
    getUserInfo,
    createUser,
};
