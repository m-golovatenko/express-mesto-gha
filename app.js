const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { NOT_FOUND_CODE, PORT, DB_URL } = require('./utils/constants');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64ae6d6d555aa6927ae032f4',
  };

  next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страницы не существует' });
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('БД подключена');
  }).catch(() => {
    console.log('Ошибка при подключении БД');
  });

app.listen(PORT);
