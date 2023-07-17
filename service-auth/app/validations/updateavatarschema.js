const Joi = require("joi");

module.exports = Joi.object({
  image: Joi.string().required().trim().messages({
    "any.required": "image is required",
    "string.base": "image must be a string",
    "string.empty": "image cannot be empty"
  })
});