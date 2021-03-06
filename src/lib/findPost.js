'use strict';

require('./connection');
const Post = require('../model/post');
const findMovieInfo = require('./findMovieInfo');

function findPost(res, id) {
  // verificando se é um ObjectId válido
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Post.findOne({ _id: id }).select('-__v').exec((error, result) => {
      if (error === null) {
        if (result) {
          findMovieInfo(res, result);
        } else {
          const requestResult = {
            status: 'success',
            data: {}
          };
          res.status(200).json(requestResult);
        }
      } else {
        console.log(error);
        res.status(503);
      }
    });
  } else {
    res.status(200).json({ status: 'erro', message: 'Verifique o ID informado' });
  }
}

module.exports = findPost;
