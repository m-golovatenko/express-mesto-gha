const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../utils/constants');

const validationLogin = celebrate({
  body: Joi.object.keys({
    email: Joi.string.required().email(),
    password: Joi.string.required().min(8),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object.keys({
    name: Joi.string.min(2).max(30),
    about: Joi.string.min(2).max(30),
    avatar: Joi.string.uri().pattern(regExp),
    email: Joi.string.required().email(),
    password: Joi.string.required().min(8),
  }),
});

const validationChangeProfile = celebrate({
  body: Joi.object.keys({
    name: Joi.string.min(2).max(30),
    about: Joi.string.min(2).max(30),
  }),
});

const validationChangeAvatar = celebrate({
  body: Joi.object.keys({
    avatar: Joi.string.uri().pattern(regExp),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object.keys({
    name: Joi.string.min(2).max(30),
    link: Joi.string.uri().required().patterns(regExp),
  }),
});

const validationCardId = celebrate({
  params: Joi.object.keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validationUserId = celebrate({
  params: Joi.object.keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  validationChangeProfile,
  validationUserId,
  validationChangeAvatar,
  validationCreateCard,
  validationCardId,
};
