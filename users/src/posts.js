//posts.js này không phải là model, chỉ là schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;