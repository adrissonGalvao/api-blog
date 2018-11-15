'use strict';

const Post = require('../model/post');
require('./connection');
const dataPost = require('../../mock');

function extractData() {
  dataPost.map((item) => {
    new Post(item).save((error, result) => {
      console.log(result);
    });
    return true;
  });
}

module.exports.init = extractData;
