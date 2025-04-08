const prisma = require("../db/prisma")
const bcrypt = require("bcryptjs")

function loginGet(req, res) {
    res.json("Login page")
}

function signupGet(req, res) {
    res.json("Sign-up page")
}

async function signupPost(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.newUser(req.body.username, hashedPassword);
    // generate jwt ?
    res.status(201).send("User created");
}

async function loginPost(req, res) {
    const user = verifyPassword(req.body.username, req.body.password);
    if (user) {
        res.status(201).send("User logged in")
    }
}

async function verifyPassword(username, password) {
    const user = await prisma.findUser(username);

    if (!user) {
        res.status(404).send("User not found.")
    }

    if (!bcrypt.compare(password, user.password)) {
        res.status(401).send("Wrong password.")
    }

    console.log("Successfully logged in.")
    return user
}

module.exports = {
    loginGet,
    signupGet,
    signupPost,
    loginPost
}