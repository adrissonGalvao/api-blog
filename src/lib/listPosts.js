'use strict';

const Post = require('../model/post');
require('./connection');

function listPosts(res) {
  Post.find({}, (error, result) => {
    if (error === null) {
      res.status(200).json(result);
    } else {
      console.log(error);
      res.status(503);
    }
  });
}

module.exports = listPosts;
