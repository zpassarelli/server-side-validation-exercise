'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    firstName: Joi.string()
    .required()
    .min(4)
  }
};
