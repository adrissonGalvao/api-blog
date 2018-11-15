'use strict';

// dependência externas
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.use((req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, process.env.KEY_JWT);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Acesso negado, verifique seu token!' });
  }
});

module.exports = router;
