const fs = require("node:fs");
const path = require("path");

function showTodos(req, res, next) {
    let username = req.user.username;


    const filePath = path.join(__dirname, "../data/todo.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        let todo = JSON.parse(data).todo;
        res.render('home', { username, todo });
    })
}

function deleteTask(req, res, next) {
    let q = JSON.parse(req.params.id);

    let newTodo = [];
    const filePath = path.join(__dirname, "../data/todo.json");

    fs.readFile(filePath, "utf-8", (err, data) => {
        let oldTodo = JSON.parse(data).todo;

        oldTodo.forEach(element => {
            if (element.id !== q) {
                newTodo.push(element)
            }
        });
        fs.writeFile(filePath, JSON.stringify({ todo: newTodo }), "utf-8", (err) => {})

    })

    res.redirect('/home')

}


function addTask(req, res, next) {
    const newtodo = req.body;
    newtodo.isCompleted = false;
    newtodo.createdBy = req.user.username;
    newtodo.id = Date.now();
    const filePath = path.join(__dirname, "../data/todo.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        let oldTodos = JSON.parse(data).todo;
        let todo = [];
        todo.push(newtodo);
        oldTodos.forEach(element => {

            todo.push(element)
        });


        fs.writeFile(filePath, JSON.stringify({ todo }), "utf-8", (err) => {});
    })
    res.redirect('/home')

}

function updateTask(req, res, next) {
    let q = JSON.parse(req.params.id);

    let newTodo = [];
    const filePath = path.join(__dirname, "../data/todo.json");

    fs.readFile(filePath, "utf-8", (err, data) => {
        let oldTodo = JSON.parse(data).todo;

        oldTodo.forEach(element => {
            if (element.id === q) {
                if (element.isCompleted) { element.isCompleted = false } else {
                    element.isCompleted = true;
                }

            }
            newTodo.push(element)
        });
        fs.writeFile(filePath, JSON.stringify({ todo: newTodo }), "utf-8", (err) => {})
        res.redirect('/home')
    })
    console.log(q)
}
module.exports = { showTodos, addTask, deleteTask, updateTask };