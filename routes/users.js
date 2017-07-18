'use strict';

const express = require('express');

const router = express.Router();

const knex = require('../knex');

router.get('/' , (req, res, next) => {
  knex('users')
    .select( 'id', 'firstname', 'lastname', 'username', 'phone', 'email')
    .then((results) => {
      console.log(results);
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

// router.get('/:id' , (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//   console.log('variable id', id);
//
//   if (Number.isNaN(id)) {
//     return next();
//   }
//   knex('users')
//     // .where('id' , id)
//     // .select( 'id', 'firstname', 'lastname', 'username', 'email', 'phone')
//     .then((results) => {
//       res.send(results[0]);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.post('/' , (req, res, next) => {
//   var name = req.body.name;
//   var message = req.body.message;
//
//   knex('users')
//
//     // .insert({
//     //   firstname: firstn,
//     //   message: message
//     // })
//     .returning(['name', 'message'])
//     .then((results) => {
//       res.send(results[0]);
//       //OR can also delete anything we don't want in our response message
//       //var newResults = results[0];
//       //delete newResults.id;
//       //delete newResults.created_at;
//       //delete newResults.updated_at;
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
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
