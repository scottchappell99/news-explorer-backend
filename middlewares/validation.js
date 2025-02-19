const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": "Article must have a keyword.",
    }),
    title: Joi.string().required().messages({
      "string.empty": "Article must have a title.",
    }),
    text: Joi.string().required().messages({
      "string.empty": "Article must have content.",
    }),
    date: Joi.string().required().messages({
      "string.empty": "Article must be dated.",
    }),
    source: Joi.string().required().messages({
      "string.empty": "Article must have a source.",
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": "Article must have a url",
      "string.uri": "Article must have a valid url.",
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": "Article must have an image",
      "string.uri": `Article's image must have a valid url`,
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": `The minimum length of the "name" field is 2.`,
      "string.max": `The maximum length of the "name" field is 30.`,
      "string.empty": `The "name" field must be filled in.`,
    }),
    email: Joi.string().required().email().messages({
      "string.email": `The "e-mail" field must be an e-mail.`,
      "string.empty": `The "e-mail" field must be filled in.`,
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": `The minimum length of the "password" field is 8.`,
      "string.empty": `The "password" field must be filled in.`,
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "e-mail" field must be an e-mail.',
      "string.empty": 'The "e-mail" field must be filled in.',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in.',
    }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.hex": "The article ID must be in hexadecimal format.",
      "string.length": "The article ID must be 24 characters long.",
    }),
  }),
});

const validateUserId = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24).required().messages({
      "string.hex": "The user ID must be in hexadecimal format.",
      "string.length": "The user ID must be 24 characters long.",
    }),
  }),
});

module.exports = {
  validateArticleBody,
  validateUserBody,
  validateAuthentication,
  validateArticleId,
  validateUserId,
};
