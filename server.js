'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(express.static('./public'));

app.use(bodyParser.json());

const users = require('./routes/users');

app.use('/users', users);

//display validation error
app.use((err, _req, res, _next) => {
  if (err.status) {
    console.log("there is an error.status");
    console.log('err.status', err.status);
    console.log('err', err);
    return res.status(err.status).send(err);
  }

  console.error('else err', err);
  res.sendStatus(500);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
