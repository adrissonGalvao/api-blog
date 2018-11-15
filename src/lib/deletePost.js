'use strict';

require('./connection');
const Post = require('../model/post');

function deletePost(res, id) {
  // verificando se é um ObjectId válido
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Post.deleteOne({ _id: id }, (error, result) => {
      if (error === null) {
        let requestResult;
        if (result.n === 1) {
          requestResult = {
            status: 'success',
            message: 'Deletado com sucesso!'
          };
        } else {
          requestResult = {
            status: 'erro',
            message: 'Não foi possível deletar, verifique os dados!'
          };
        }
        res.status(200).json(requestResult);
      } else {
        console.log(error);
        res.status(503);
      }
    });
  } else {
    res.status(200).json({ status: 'erro', message: 'Verifique o ID informado' });
  }
}

module.exports = deletePost;
