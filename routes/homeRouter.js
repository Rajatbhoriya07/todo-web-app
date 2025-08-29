var express = require('express');
const { authenticate } = require('../controlers/authController');
var router = express.Router();
const { showTodos } = require("../controlers/todoController")

router.get('/', authenticate, showTodos);

module.exports = router;