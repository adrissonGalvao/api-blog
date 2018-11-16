'use strict';

const Validator = require('jsonschema').Validator;

require('./connection');
const Post = require('../model/post');

function createPost(res, body) {
  const schemaPost = {
    id: 'validatingPost',
    type: 'object',
    properties: {
      title: {
        type: String
      },
      content: {
        type: String
      },
      author: {
        type: String
      },
      dateCreation: {
        type: Date,
        pattern: /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g
      },
      movie: {
        type: String
      }
    },
    required: ['title', 'content', 'author', 'dateCreation', 'movie']
  };
  const validationResult = new Validator().validate(body, schemaPost);
  let requestResult;
  if (validationResult.errors.length === 0) {
    new Post(body).save((error, result) => {
      requestResult = {
        status: 'success',
        message: 'Criado com sucesso!',
        data: result
      };
      res.status(200).json(requestResult);
    });
  } else {
    requestResult = {
      status: 'erro',
      message: 'Dados informados são inválidos!'
    };
    res.status(200).json(requestResult);
  }
}

module.exports = createPost;
