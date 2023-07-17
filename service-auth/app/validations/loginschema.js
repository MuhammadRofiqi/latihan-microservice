const Joi = require("joi");

module.exports = Joi.object({
  username: Joi.string().required().trim().messages({
    "any.required": "username is required",
    "string.base": "username must be a string",
    "string.empty": "username cannot be empty"
  }),
  password: Joi.string().required().min(8).trim().messages({
    "any.required": "password is required",
    "string.base": "password must be a string",
    "string.empty": "password cannot be empty",
    "string.min": "password minimal 8 character"
  })
});