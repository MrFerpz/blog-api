const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');

// homepage - send to login
router.get("/api", controller.loginGet)

// login & sign-up pages
router.get("/api/signup", controller.signupGet);
router.post("/api/signup", controller.signupPost);
router.post("/api/login", controller.loginPost);
router.post("/api/admin/login", controller.adminLoginPost);

// profile
router.get("/api/profile", controller.checkToken, controller.userDetailsJson); 

// post list
router.get("/api/posts", controller.checkToken, controller.postPageGet);
router.post("/api/posts", controller.checkToken, controller.postPagePost);

// individual posts, can post comments
router.get("/api/posts/:postID", controller.checkToken, controller.postGet);
router.post("/api/posts/:postID", controller.checkToken, controller.commentPost);
router.put("/api/posts/:postID/edit", controller.checkPostAuthor, controller.postPut);
router.put("/api/posts/:postID/:commentID", controller.checkCommentAuthor, controller.commentPut);
router.delete("/api/posts/:postID", controller.checkPostAuthor, controller.postDelete);
router.delete("/api/posts/:postID/:commentID", controller.checkCommentAuthor, controller.commentDelete)

// // admin portal
router.post("/api/admin-application/:userID", controller.makeAdmin)
router.get("/api/admin", controller.checkAdmin, controller.adminPortalGet)
router.get("/api/admin/posts", controller.checkAdmin, controller.adminPostPageGet);
router.get("/api/admin/users", controller.checkAdmin, controller.getAllUsers);
// router.post("/admin/posts", controller.adminPostPagePost);
// router.get("/admin/posts/:postID", controller.adminPostGet);
// router.put("/admin/posts/:postID", controller.adminPostPut);
// router.delete("/admin/posts/:postID", controller.adminPostDelete);

module.exports = router;