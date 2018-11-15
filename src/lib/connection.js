'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const connection = mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.URL_MONGO}/api-blog`,
  { useNewUrlParser: true, useCreateIndex: true }
);

module.exports = connection;
