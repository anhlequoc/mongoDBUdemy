const mongoose = require('mongoose');
const PostSchema = require('../src/posts');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name should be longer than 2 characters"
    },
    required: [true, "Name is required!"]
  },
  // postCount: Number, - chuyển postCount sang Virtual Type
  posts: [PostSchema] //represent for 1 - n relationship 
});

UserSchema.virtual('postCount').get(function() {      
  return this.posts.length; //this lúc này trỏ vào user, nếu dùng arrow function, this sẽ trỏ vào object hiện tại chứa user
});

const User = mongoose.model("user", UserSchema);

module.exports = User;