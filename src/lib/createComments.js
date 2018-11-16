'use strict';

const Validator = require('jsonschema').Validator;

require('./connection');
const Post = require('../model/post');

function createComment(res, id, body) {
  const schemaPost = {
    id: 'validatingComment',
    type: 'object',
    properties: {
      content: {
        type: String
      },
      author: {
        type: String
      },
      date: {
        type: Date,
        pattern: /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g
      }
    },
    required: ['content', 'author', 'date']
  };
  const validationResult = new Validator().validate(body, schemaPost);
  let requestResult;
  if (validationResult.errors.length === 0) {
    Post.updateOne({ _id: id }, { comments: body }, (error, result) => {
      if (error === null) {
        if (result.n === 1) {
          requestResult = {
            status: 'success',
            message: 'Atualizado com sucesso!'
          };
        } else {
          requestResult = {
            status: 'erro',
            message: 'Não foi possível atualizar, verifique o ID informado!'
          };
        }
        res.status(200).json(requestResult);
      }
    });
  } else {
    requestResult = {
      status: 'erro',
      message: 'Dados informados são inválidos!'
    };
    res.status(200).json(requestResult);
  }
}

module.exports = createComment;
