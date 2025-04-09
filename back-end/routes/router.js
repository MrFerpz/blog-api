const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');


// homepage - send to login
router.get("/", controller.loginGet)

// login & sign-up pages
router.get("/signup", controller.signupGet);
router.post("/signup", controller.signupPost);
router.post("/login", controller.loginPost);

// post list
router.get("/posts", controller.postPageGet);
router.post("/posts", controller.postPagePost);

// individual posts, can post comments
router.get("/posts/:postID", controller.postGet);
router.post("/posts/:postID/comments", controller.commentPost);

// // admin portal
// router.get("/admin/posts", controller.adminPostPageGet);
// router.post("/admin/posts", controller.adminPostPagePost);
// router.get("/admin/posts/:postID", controller.adminPostGet);
// router.put("/admin/posts/:postID", controller.adminPostPut);
// router.delete("/admin/posts/:postID", controller.adminPostDelete);

module.exports = router;