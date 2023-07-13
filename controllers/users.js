const User = require('../models/user');

const {
  SUCCESS_CODE, SUCCESS_CREATE_CODE, WRONG_DATA_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS_CODE).send(users))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(WRONG_DATA_CODE).send({ message: 'Переданы некорректные данные при поиске пользователя' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CREATE_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(WRONG_DATA_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка.' });
    });
};

module.exports.changeProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      if (err.name === 'ValidationError') {
        return res.status(WRONG_DATA_CODE).send({ message: 'Переданы некорректные данные при изменении данных пользователя.' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка.' });
    });
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      }

      if (err.name === 'ValidationError') {
        return res.status(WRONG_DATA_CODE).send({ message: 'Переданы некорректные данные при изменении аватара пользователя.' });
      }

      return res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка.' });
    });
};
