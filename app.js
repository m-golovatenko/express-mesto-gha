const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('*', () => {
  throw new NotFoundError('Страницы не существует.');
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Серверная ошибка'
        : message,
    });
  next();
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('БД подключена');
  }).catch(() => {
    console.log('Ошибка при подключении БД');
  });

app.listen(PORT);
