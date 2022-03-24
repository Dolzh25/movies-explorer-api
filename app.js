require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notFoundError');
const limiter = require('./middlewares/limiter');
const config = require('./utils/config');
const { errorMessages } = require('./utils/constants');

const app = express();

// const corsOptions = {
//   origin: '*',
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
//   credentials: true,
// };

mongoose.connect(config.mongo_dsn);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(cors());

app.post(limiter);
app.use(router);

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundRouteErrorMessage));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.port);
