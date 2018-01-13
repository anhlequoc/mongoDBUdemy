const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/users');
const BlogPost = require('../src/blogPosts');

describe('Middleware Testing', () => {
  let user, blogPost;
  
  //declare instances and their relation
  beforeEach((done) => {
    user = new User({name: 'jane'});
    blogPost = new BlogPost({title: "blog title", content: "blog content"});

    //declare relation
    user.blogPosts.push(blogPost);

    //save user and blogPost to db
    Promise.all([user.save(), blogPost.save()])
      .then(() => done());
  });

  it('should remove blogpost before removing user', (done) => {
    user.remove()
      .then(() => BlogPost.count())//BlogPost.count() sinh ra async với db nên dùng thêm 1 .then nữa
      .then((count) => { //count được trả về từ sự kiện async trước đó
        assert(count === 0);
        done();
      });
  });
});