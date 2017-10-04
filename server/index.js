const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes');
const path = require('path');
const db = require('./db/index');


const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {});

module.exports = app;
