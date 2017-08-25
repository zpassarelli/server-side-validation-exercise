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

  let userObj = req.body.users;

  //All inputs required
  if(Object.values(userObj).every(val => val !== '') === false){
    res.status(418).send('All form inputs required.');
  } else {

    let valid = true;
    let errorMsg = 'Invalid form input';

    //Username at least 7 characters
    if(userObj.username.length < 7) {
      valid = false;
      errorMsg = 'Username must be at least seven characters.'
    }

    //Username starts with a letter
    let firstChar = userObj.username[0].toLowerCase().charCodeAt();
    if(firstChar < 97 || firstChar > 122){
      valid = false;
      errorMsg = 'Username must start with a letter.';
    }

    //Username does not contain punctuation
    for(let i in userObj.username){
      let currentChar = userObj.username[i].toUpperCase().charCodeAt();
      if(currentChar > 47 && currentChar < 91){
        if(currentChar > 57 && currentChar < 65){
          valid = false;
          errorMsg = 'Username cannot contain punctuation.'
        }
      } else {
        valid = false;
        errorMsg = 'Username cannot contain punctuation.'
      }
    }

    //Email has proper format
    let emailReg = (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if(userObj.email.match(emailReg) === null){
      valid = false;
      errorMsg = 'Email must be valid.';
    }

    //Phone number is a number
    let number = parseInt(userObj.phone);
    if(isNaN(number)) {
      valid = false;
      errorMsg = 'Phone number must be a number.'
    }
    //Phone number is 10 digits
    if(String(number).length < 10){
      valid = false;
      errorMsg = 'Phone number must be 10 digits.'
    }


    if(valid){
      knex('users')
        .insert({
          firstname: userObj.firstName,
          lastname: userObj.lastName,
          username: userObj.username,
          email: userObj.email,
          phone: userObj.phone
        })
        .returning(['firstname', 'lastname', 'username','phone','email'])
        .then((results) => {
          res.send(results[0]);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      res.status(418).send(errorMsg);
    }
  }

});

module.exports = router;
