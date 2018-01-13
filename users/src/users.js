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
    required: [true, "Name is required!"],
  },
  // postCount: Number, - chuyển postCount sang Virtual Type
  posts: [PostSchema], //represent for 1 - n relationship 
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {      
  return this.posts.length; //this lúc này trỏ vào user, nếu dùng arrow function, this sẽ trỏ vào object hiện tại chứa user
});

//middleware function xảy ra trước sự kiện remove 1 user khỏi db
UserSchema.pre('remove', function(next) { //dùng function để this === joe - 1 instace cụ thể, giống như khai báo virtual type ở trên
  const BlogPost = mongoose.model('blogPost');

  //remove all blog posts of user
  BlogPost.remove({_id: {$in: this.blogPosts}})
    .then(() => next()); //remove là hàm touch vào db nên ở đây có async, vì thế thêm next để khi async xong thì chạy tiếp hàm tiếp theo
});

const User = mongoose.model("user", UserSchema);

module.exports = User;