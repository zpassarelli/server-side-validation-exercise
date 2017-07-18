'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(express.static('./public'));

app.use(bodyParser.json());

const users = require('./routes/users');

app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
