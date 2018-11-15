'use strict';

// dependências externas
const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const RateLimit = require('express-rate-limit');

const app = express();
app.enable('trust proxy');

// limitador de requisição
const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// parser para post
app.use(express.json());

const middleware = require('./src/middleware');

// registro de log
const accessLogStream = fs.createWriteStream((__dirname, 'access.log'), { flags: 'a' });
app.use(logger('combined', { stream: accessLogStream }));

// rotas disponíveis
app.use(middleware, require('./src/routes/index'), apiLimiter);

// redirecionamento 404
app.use((req, res) => {
  res.status(404).send('404');
});

module.exports = app;
