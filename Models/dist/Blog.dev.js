"use strict";

var mongoose = require('mongoose');

var BlogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  tag: {
    type: String,
    require: true,
    "default": 'Technology'
  },
  description: {
    type: String,
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  image: {
    type: String
  }
});
module.exports = mongoose.model('blog', BlogSchema);