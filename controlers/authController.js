const fs = require("node:fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const SECRET = "Ex-Navodayan";


function registerUser(req, res, next) {
    const filePath = path.join(__dirname, "../data/users.json");
    const user = req.body;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.render('error')
        }

        let users;
        if (data) {
            users = JSON.parse(data).users;
        } else {
            users = [];
        }
        if (users.find((u) => u.username === user.username)) {
            return res.render("signup", { error: "Username already taken" });
        }
        users.push(user);
        fs.writeFile(filePath, JSON.stringify({ users }, null, 2), (err) => {
            if (err) {
                console.error("Error writing users.json:", err);
                return res.status(500).send("Internal Server Error");
            }

            console.log("User registered:", user.username);
            return res.render("login", {
                success: "Signup successful! Please log in.",
            });
        });
    })

}

function verifyUser(req, res, next) {
    const { username, password } = req.body;
    const filePath = path.join(__dirname, "../data/users.json");

    fs.readFile(filePath, 'utf-8', (err, data) => {
        const users = JSON.parse(data).users;

        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {

            return res.render('login', { error: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user.id, username: user.username },
            SECRET, { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        console.log("login sucessfull");
        res.render('login', { error: "", success: "Ho gya bhai" })
    })

}

function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/auth/login");
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.redirect("/auth/login");
        }
        req.user = decoded;


        next();
    });
}

function deleteAccount(req, res, next) {
    let q = req.params.username;

    let newUsers = [];
    const filePath = path.join(__dirname, "../data/users.json");

    fs.readFile(filePath, "utf-8", (err, data) => {
        let oldUsers = JSON.parse(data).users;

        oldUsers.forEach(element => {
            if (element.username !== q) {
                newUsers.push(element)
            }
        });
        fs.writeFile(filePath, JSON.stringify({ users: newUsers }), "utf-8", (err) => {})

    })

    res.redirect('/auth/logout')
}



module.exports = { registerUser, verifyUser, authenticate, deleteAccount }