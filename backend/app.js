const express = require('express');
// const path = require('path'); т.к. убрали строку из-за static нижежеже
// const bodyParser = require('body-parser');  убираем, заменяем на express.json()
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, MONGO_URL } = require('./config');

mongoose.connect(MONGO_URL, {});

const app = express();
app.use(cors()); // здесь нужно не забыть добавить домены фронта и бэка для настройки cors политики

// app.use(express.static(path.join(__dirname, 'public'))); убираем по ревью, т.к. нет папки static
app.use(express.json());

app.use('/', router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
