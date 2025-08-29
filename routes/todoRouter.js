var express = require('express');
const { authenticate } = require('../controlers/authController');
const { addTask, deleteTask, updateTask } = require('../controlers/todoController');
var router = express.Router();

router.get('/', authenticate, function(req, res, next) {
    res.send(req.user)
});
router.post('/add-task', authenticate, addTask);
router.get('/delete-task/:id', authenticate, deleteTask)
router.get('/update-task/:id', authenticate, updateTask)
module.exports = router;