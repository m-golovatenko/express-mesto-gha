const User = require('../models/user');

const {
  SUCCESS_CODE, SUCCESS_CREATE_CODE, WRONG_DATA_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS_CODE).res.send(users))
    .catch((err) => res.status(SERVER_ERROR_CODE).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({ message: ' Пользователь по указанному _id не найден. ' });
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => res.status(SERVER_ERROR_CODE).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CREATE_CODE).send(user))
    .catch((err) => res.status(SERVER_ERROR_CODE).send({ message: err.message }));
};

module.exports.changeProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => res.status(SERVER_ERROR_CODE).send({ message: err.message }));
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => res.status(SERVER_ERROR_CODE).send({ message: err.message }));
};
