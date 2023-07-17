const Joi = require("joi");


module.exports = Joi.object({
  title: Joi.string().required().trim().messages({
    "any.required": "title is required",
    "string.base": "title must be a string",
    "string.empty": "title cannot be empty"
  }),
  content: Joi.string().required().trim().messages({
    "any.required": "content is required",
    "string.base": "content must be a string",
    "string.empty": "content cannot be empty"
  }),
  images: Joi.array().items(Joi.string()).optional()
});