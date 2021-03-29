require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

/**
 * Import routes "controller"
 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');

/**
 * Application init
 */
var app = express();

/**
 * Enable middlewares
 */
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Register routes
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

module.exports = app;
