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
  let firstName = req.body.users.firstName;
  let lastName = req.body.users.lastName;
  let username = req.body.users.username;
  let email = req.body.users.email;
  let phone = req.body.users.phone;

  console.log(firstName);

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
      console.log(results);
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});
//
// router.patch('/:id', (req, res, next) => {
//   var id = Number.parseInt(req.params.id);
//   console.log(req.body);
//   var newName = req.body.name;
//   var newMessage = req.body.message;
//
//   knex('messages')
//     .where('id', id)
//     .orderBy('id')
//     .then((result) => {
//       if (!result) {
//         res.send('message not found');
//       }
//
//       let messageToUpdate = result[0];
//       messageToUpdate.name = newName;
//       messageToUpdate.message = newMessage;
//
//       knex('messages')
//         .where('id', id)
//         .update(messageToUpdate, '*')
//         .then((result) => {
//           delete result[0].created_at;
//           delete result[0].updated_at;
//           res.send(result[0]);
//         })
//         .catch((err) => {
//           next(err);
//         });
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
//
// router.delete('/:id' , (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//   if (Number.isNaN(id)) {
//     return next();
//   }
//   knex('messages')
//     .where('id' , id)
//     .del()
//     .returning (['id' , 'name', 'message'])
//     .then ((results) => {
//       res.send(results[0]);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;
