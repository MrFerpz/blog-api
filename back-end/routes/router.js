const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');

// later, add auth middleware (JWT)
router.get("/", controller.loginGet)
router.get("/signup", controller.signupGet);
router.post("/signup", controller.signupPost);
router.post("/login", controller.loginPost)

module.exports = router;