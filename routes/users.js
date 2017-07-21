'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/' , (req, res, next) => {
  knex('users')
    .select( 'id', 'firstname', 'lastname', 'username', 'phone', 'email')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/' , (req, res, next) => {
  let valid = true;
  let userArr = [];
  let firstName = req.body.users.firstName;
  let lastName = req.body.users.lastName;
  let username = req.body.users.username;
  let email = req.body.users.email;
  let phone = req.body.users.phone;
  userArr.push(firstName,lastName,username,email,phone);

  valid = userArr.every(prop => prop !== '');

  if(username.length < 7){
    valid = false;
  }
  let firstChar = username[0].toLowerCase().charCodeAt();
  if(firstChar)

  console.log(valid);
  if(valid){
    knex('users')
      .insert({
        firstname: firstName,
        lastname: lastName,
        username: username,
        email: email,
        phone: phone
      })
      .returning(['firstname', 'lastname', 'username','phone','email'])
      .then((results) => {
        res.send(results[0]);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.send('invalid');
  }
});

module.exports = router;
