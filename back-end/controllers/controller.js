const prisma = require("../db/prisma")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

function loginGet(req, res) {
    res.json("Welcome to the login page!");
}

function signupGet(req, res) {
    res.json("Sign-up page")
}

async function signupPost(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.newUser(req.body.username, hashedPassword);
    res.status(201).send("User created");
}

async function loginPost(req, res) {
    const user = await verifyPassword(req.body.username, req.body.password);

    // remove password
    const payload = { 
        id: user.id,
        created_at: user.created_at,
        username: user.username,
        isAdmin: user.isAdmin,
        isAuthor: user.isAuthor
    }

    if (user) {
        const token = jwt.sign({
                            data: {payload}}, 
                            "megasecretkey",
                            {expiresIn: 60 * 60}
                        )

        req.token = token;
        // So, later it'll be up to the client/front-end to include the header in the format: "Authorization: Bearer ${token}", then the server verifies by decoupling and using jwt.verify!

        res.json({
            message: "Successfully logged in!",
            data: token
        });
    }
}

function checkToken(req, res, next) {
     // The client/front-end has to include the header: "Authorization: Bearer ${token}", then the server verifies by decoupling and using jwt.verify!
     const authHeader = req.headers["authorization"];
     if (!authHeader) {
         res.status(401).send("No auth header");
     }
     // Should be in format "Bearer ${token}" so...
     const bearerArray = authHeader.split(" ");
     const bearerToken = bearerArray[1];
     // now we have our token from the client, we can run it in the verify function
     // jwt verify can return the user's data in the callback
     jwt.verify(bearerToken, "megasecretkey", (err, decoded) => {
         if (err) {
             console.log(err);
             res.status(401).send(err)
         }
         console.log("Token verified!")
     });

     next()
}

function userDetails(req, res) {
    // function to decrypt the token and return the payload (user data)
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).send("No auth header.")
    }
    const bearerArray = authHeader.split(" ");
    const bearerToken = bearerArray[1];
    // now we have the token we can verify it and extract some user data
    const user = jwt.verify(bearerToken, "megasecretkey", (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401).send(err)
        }
        return decoded
    });
    return user
}

function userDetailsJson(req, res) {
    const user = userDetails(req, res);
    res.json(user);
}

function checkAdmin(req, res, next) {
    const user = userDetails(req, res)
    console.log(user)
    if (user.data.isAdmin == true) {
        next()
    }
    else res.status(401).send("You do not have admin rights to view this page.")
}

async function postPageGet(req, res) {
    const allPosts = await prisma.findAllPosts();
    res.json(allPosts)
}

async function postPagePost(req, res) {
    const user = userDetails(req, res);

    const title = req.body.title;
    const content = req.body.content;
    const authorID = user.data.payload.id;

    await prisma.newPost(title, content, authorID);
    const allPosts = await prisma.findAllPosts();
    res.json(allPosts);
}

async function verifyPassword(username, password) {
    const user = await prisma.findUser(username);

    if (!user) {
        console.log("User not found.");
        return
    }

    if (!bcrypt.compare(password, user.password)) {
        console.log("Wrong password.");
        return
    }

    console.log("Login details verified.")
    return user
}

async function postGet(req, res) {
    const postID = Number(req.params.postID);
    const post = await prisma.findPost(postID);
    res.json(post);
}

async function commentPost(req, res) {
    const user = userDetails(req, res)

    const content = req.body.content;
    const postID = Number(req.params.postID);
    const userID = user.data.payload.id;

    await prisma.newComment(content, postID, userID);
    res.json("Success");
    // then we want to return the post with all comments attached
    // const post = await prisma.findPost(postID)
    // res.json(post);
}

async function adminPostPageGet(req, res) {
    res.json("Admin post page accessed.")
}

async function adminPortalGet(req, res) {
    res.json("Admin portal accessed.")
}

async function makeAdmin(req, res) {
    const userID = Number(req.params.userID);
    await prisma.makeAdmin(userID);
    console.log(`${userID} has been made an admin.`);
    res.json(`${userID} is now an admin`);
}

async function checkPostAuthor(req, res, next) {
    const user = userDetails(req, res);
    const postID = Number(req.params.postID);

    const post = await prisma.findPost(postID);

    if (user.data.payload.id === post.authorID) {
        next();
    }
    else {
        res.status(401).send("You are not the post's author, so you may not edit or delete it")
    }
}

async function checkCommentAuthor(req, res, next) {
    const user = userDetails(req, res);
    const commentID = Number(req.params.commentID)

    const comment = await prisma.findComment(commentID);

    if (user.data.payload.id === comment.authorID) {
        next();
    }
    else {
        res.status(401).send("You are not the comment's author, so you may not edit or delete it")
    }
}

async function postPut(req, res) {
    // assume that there's info in the req.body ::
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const postID = Number(req.params.postID);

    const newPost = await prisma.editPost(postID, newTitle, newContent);
    res.json(newPost);
}

async function commentPut(req, res) {
    const newContent = req.body.content;
    const commentID = Number(req.params.commentID);

    const newComment = await prisma.editComment(commentID, newContent);
    res.json(newComment)
}

async function postDelete(req, res) {
    const postID = Number(req.params.postID);
    await prisma.deletePost(postID);
}

async function commentDelete(req, res) {
    const commentID = Number(req.params.commentID);
    await prisma.deleteComment(commentID)
}

async function getAllUsers(req, res) {
    const users = await prisma.findAllUsers();
    console.log(users);
    res.json(users);
}

async function adminLoginPost(req, res) {
    const user = await verifyPassword(req.body.username, req.body.password);
    if (!user.isAdmin) {
        res.status(401).send("Not an admin.");
    }
    
    else {
        // remove password
    const payload = { 
        id: user.id,
        created_at: user.created_at,
        username: user.username,
        isAdmin: user.isAdmin,
        isAuthor: user.isAuthor
    }

    const token = jwt.sign({
                        data: payload}, 
                        "megasecretkey",
                        {expiresIn: 60 * 60}
                    )

        req.token = token;
            res.json({
                message: "Successfully logged in as admin!",
                data: token
            });
        }
    }

async function deleteUser(req, res) {
    const userID = Number(req.params.userID);
    await prisma.deleteUser(userID)
}


module.exports = {
    loginGet,
    signupGet,
    signupPost,
    loginPost,
    postPageGet,
    postPagePost,
    postGet,
    commentPost,
    checkAdmin,
    checkToken,
    adminPostPageGet,
    adminPortalGet,
    makeAdmin,
    checkPostAuthor,
    checkCommentAuthor,
    postPut,
    commentPut,
    postDelete,
    commentDelete,
    userDetailsJson,
    getAllUsers,
    adminLoginPost,
    deleteUser
}