const prisma = require("../db/prisma")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

function loginGet(req, res) {
    res.json("Login page")
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
    req.user = user;

    if (user) {
        const token = jwt.sign({
                            data: {user}}, 
                            "megasecretkey",
                            {expiresIn: 60 * 60}
                        )

        req.token = token;
        // So, it's up to the client/front-end to include the header in the format: "Authorization: Bearer ${token}", then the server verifies by decoupling and using jwt.verify!

        res.json({
            message: "Successfully logged in!",
            data: token
        });
    }
}

function postPageGet(req, res) {
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
        console.log("Post page accessed!")
        res.json(decoded)
    });
}

async function postPagePost(req, res) {
    jwt.verify(req.body.token, "megasecretkey", (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401).send(err)
        }
    });

    const title = req.body.title;
    const content = req.body.content;
    const authorID = req.user.id;

    await prisma.newPost(title, content, authorID);
    res.json("Successfully added a new post");
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

    console.log("Successfully logged in.")
    return user
}

async function postGet(req, res) {
    const postID = req.params.postID;

    const post = await prisma.findPost(postID);
    res.json(post);
}

async function commentPost(req, res) {
    const content = req.body.content;
    const postID = req.params.postID;
    const userID = req.user.id;

    await prisma.newComment(content, postID, userID);
    res.json("Comment successfully posted");
}

module.exports = {
    loginGet,
    signupGet,
    signupPost,
    loginPost,
    postPageGet,
    postPagePost,
    postGet,
    commentPost
}