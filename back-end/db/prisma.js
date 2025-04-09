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

async function newPost(title, content, userID) {
    await prisma.posts.create({
        data: {
            title: title,
            content: content,
            authorID: userID
        }
    })
}

module.exports = {
    newUser,
    findUser,
    newPost
}
