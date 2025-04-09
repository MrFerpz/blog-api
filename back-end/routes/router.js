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
router.get("/posts", controller.checkToken, controller.postPageGet);
router.post("/posts", controller.checkToken, controller.postPagePost);

// individual posts, can post comments
router.get("/posts/:postID", controller.checkToken, controller.postGet);
router.post("/posts/:postID/comments", controller.checkToken, controller.commentPost);

// // admin portal
router.post("/admin-application/:userID", controller.makeAdmin)
router.get("/admin", controller.checkAdmin, controller.adminPortalGet)
router.get("/admin/posts", controller.checkAdmin, controller.adminPostPageGet);
// router.post("/admin/posts", controller.adminPostPagePost);
// router.get("/admin/posts/:postID", controller.adminPostGet);
// router.put("/admin/posts/:postID", controller.adminPostPut);
// router.delete("/admin/posts/:postID", controller.adminPostDelete);

module.exports = router;