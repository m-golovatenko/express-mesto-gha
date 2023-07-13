const Card = require('../models/card');

const {
  SUCCESS_CODE, SUCCESS_CREATE_CODE, WRONG_DATA_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(SUCCESS_CODE).send(cards))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(SUCCESS_CREATE_CODE).send(card))
    .catch((err) => {
      if (err.name === 'WrongData') {
        return res.status(WRONG_DATA_CODE).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка.' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(SUCCESS_CODE).send(card);
    })
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка' }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'WrongData') {
        return res.status(WRONG_DATA_CODE).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка.' });
    });
};

module.exports.unlikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'WrongData') {
        return res.status(WRONG_DATA_CODE).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Серверная ошибка.' });
    });
};
