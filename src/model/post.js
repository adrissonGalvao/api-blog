'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  dateCreation: {
    type: Date,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  comments: [{
    author: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    date: {
      type: Date,
      require: true
    }
  }]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
