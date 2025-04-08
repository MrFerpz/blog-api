const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function newUser(username, password) {
    await prisma.users.create({
    data: {
        username: username,
        password: password
         }   
    })
}

async function findUser(username) {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    console.log(user);
    return user
}

module.exports = {
    newUser,
    findUser
}
