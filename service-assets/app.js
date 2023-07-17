const express = require('express');
const path = require('path');
const logger = require('morgan');
const boom = require("express-boom")

const app = express();

app.use(boom())
app.use(logger('dev'));
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// call main routes
app.use(require("./app/routes"));

module.exports = app;
