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

async function findPost(postID) {
    const post = await prisma.posts.findUnique({
        where: {
            id: postID
        },
        include: {
            Comments: true
        }
    })
    console.log(post);
    return post
}

async function newComment(content, postID, userID) {
    await prisma.comments.create({
        data: {
            content: content,
            postID: postID,
            authorID: userID
        }
    })
}

async function findComment(commentID) {
    const comment = await prisma.comments.findUnique({
        id: commentID
    })

    return comment
}

async function makeAdmin(userID) {
    await prisma.users.update({
        where: {
            id: userID
        },
        data: {
            isAdmin: true
        }
    })
}

async function findAllPosts() {
    const allPosts = await prisma.posts.findMany()
    return allPosts;
}

async function editPost(postID, newTitle, newContent) {
    await prisma.posts.update({
        where: {
            id: postID
        },
        data: {
            title: newTitle,
            content: newContent,
            created_at: new Date().toISOString()
        }
    });

    return findPost(postID)
}

async function editComment(commentID, newContent) {
    await prisma.comments.update({
        where: {
            id: commentID
        },
        data: {
            content: newContent
        }
    });

    return findComment(commentID)
}

async function deleteComment(commentID) {
    await prisma.comments.delete({
        where: {
            id: commentID
        }
    })
}

async function deletePost(postID) {
    await prisma.posts.delete({
        where: {
            id: postID
        }
    })
}

module.exports = {
    newUser,
    findUser,
    newPost,
    findPost,
    newComment,
    makeAdmin,
    findAllPosts,
    findComment,
    editPost,
    editComment,
    deletePost,
    deleteComment
}
