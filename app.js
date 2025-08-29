var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var authRouter = require('./routes/authRouter')
var homeRouter = require('./routes/homeRouter')
var todoRouter = require('./routes/todoRouter')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('tiny'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/todo', todoRouter);
app.use('/', (req, res, next) => {
    res.redirect("/home");
})



app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {


    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;