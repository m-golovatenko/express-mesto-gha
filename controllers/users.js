const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.changeProfile = (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;
  const { userId } = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};
