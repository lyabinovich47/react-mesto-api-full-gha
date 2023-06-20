const express = require('express');
// const path = require('path'); т.к. убрали строку из-за static нижежеже
// const bodyParser = require('body-parser');  убираем, заменяем на express.json()
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL } = require('./config');

mongoose.connect(MONGO_URL, {});

const app = express();
app.use(cors({ origin: ['http://localhost:3001', 'https://lyabinovich47.nomoredomains.rocks'] }));

// app.use(express.static(path.join(__dirname, 'public'))); убираем по ревью, т.к. нет папки
app.use(requestLogger); // логгер запросов
app.use(express.json());

// GET /crash-test — тест сервера на востановление
// не забыть удалить этот код после прохождения ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);
app.use(errorLogger); // логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
