'use strict';

const axios = require('axios');
require('dotenv').config();

function findMovieInfo(res, result) {
  // pegando título antes do parentese, pois interfere na consulta da API
  const movie = (result.movie).split('(');
  axios({
    method: 'get',
    url: `http://www.omdbapi.com/?apikey=${process.env.KEY_OMDB}&t=${encodeURI(movie)}`
  }).then((response) => {
    const completeResult = {
      result
    };
    let imdbInfo = 'Nenhuma informação encontrada!';

    if (response.data.Response === 'True') {
      delete response.data.Response;
      imdbInfo = response.data;
    }

    completeResult.imdbInfo = imdbInfo;
    const requestResult = {
      status: 'success',
      data: completeResult
    };
    res.status(200).json(requestResult);
  }).catch((error) => {
    console.log(error);
    res.status(503);
  });
}

module.exports = findMovieInfo;
