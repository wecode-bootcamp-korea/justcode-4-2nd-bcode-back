const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getUserEmail = async (email) => {
    return await prisma.$queryRaw`
		SELECT email FROM users WHERE users.email = ${email};
	`
}

const getUserInfo = async (email) => {
    return await prisma.$queryRaw`
		SELECT id, email, password FROM users WHERE users.email = ${email};
	`
}


const createuUser = async (username, email, encryptedPW) => {
    return await prisma.$queryRaw`
        INSERT INTO users(username, email, password) VALUES (${username}, ${email}, ${encryptedPW});
    `
}




module.exports = {
    getUserEmail,
    getUserInfo,
    createuUser
};