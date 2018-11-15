'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('API para extração de dados e controle do conteúdo dos posts do blog');
  next();
});

router.post('/post', (req, res) => {
  const createPost = require('../lib/createPost');
  const { body } = req;
  createPost(res, body);
});

router.get('/posts', (req, res) => {
  const listPosts = require('../lib/listPosts');
  listPosts(res);
});

router.get('/post:/id', (req, res) => {
  const findPost = require('../lib/findPost');
  const { id } = req.params;
  findPost(res, id);
});

router.patch('/post:/id', (req, res) => {
  const updatePost = require('../lib/updatePost');
  const { id } = req.params;
  const { body } = req;
  updatePost(res, id, body);
});

router.delete('/post:/id', (req, res) => {
  const deletePost = require('../lib/deletePost');
  const { id } = req.params;
  deletePost(res, id);
});

module.exports = router;
