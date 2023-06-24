const express = require("express");
const router = express.Router();
const authsController = require("../controllers/auths-controller");
const proController = require("../controllers/pro-controller");
const adminControllers = require("../controllers/admins-controller");
// const {login,register } = require("../controllers/auth.js");


const {
    requiredadmin
} = require("../authentication");

const hide = (req, res, next) => {
    if (req.session.admin) {
        res.redirect('/auths/admin/dashboard/')
    } else {
        next()
    }
}

// user

// router.post("/login", login);
// router.post("/register", register);
router.get('/signup', authsController.getSignup);
router.post("/signup", authsController.postSignup);
router.get('/signin', authsController.getSignin);
router.post("/signin", authsController.postSignin);
router.get("/logout", authsController.logOut);
// pro
router.post("/pro/login", proController.login);
router.post("/pro/signup", proController.register);
// admin 
router.get('/admin/dashboard/', requiredadmin, adminControllers.getDashboard);
router.get('/admin/', hide, adminControllers.getSignup);
router.post("/admin/signup", adminControllers.postSignup);
router.get('/admin/signin', hide, adminControllers.getSignin);
router.post("/admin/signin", adminControllers.postSignin);
router.get("/admin/logout", adminControllers.logOut);

module.exports = router;