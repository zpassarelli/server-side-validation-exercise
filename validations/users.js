'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
      users: Joi.object({
        firstName: Joi.string().required()
      })
  }
};
