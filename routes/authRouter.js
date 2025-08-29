var express = require('express');
var router = express.Router();
var { registerUser, verifyUser, deleteAccount, authenticate } = require('../controlers/authController');

//signup page 
router.get('/signup', function(req, res, next) {
    res.render('signup');
});
//signup request
router.post('/signup', registerUser);
//login page
router.get('/login', function(req, res, next) {
    res.render('login');
});
//login request

router.post('/login', verifyUser);
//logout request
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/auth/login");
});
router.get('/forgot-password', (req, res) => {

    console.log("Email verify wala lana h ure")
    res.redirect("/auth/signup")
})
router.get('/delete-Account/:username', authenticate, deleteAccount)


module.exports = router;