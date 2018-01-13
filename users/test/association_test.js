const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/users');
const BlogPost = require('../src/blogPosts');
const Comment = require('../src/comments');

describe('Association Test', () => {
  let user, blogPost, comment;

  beforeEach((done) => {
    user = new User({name: 'jane'});
    blogPost = new BlogPost({title: 'blog title', content: 'blog content...'});
    comment = new Comment({content: 'comment content'});

    //add relation between instances
    user.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = user;

    //save all 3 instances to mongodb - using Promise in ES6
    Promise.all([user.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('should save relation between user and blogPost', (done) => {
    User.findOne({name: 'jane'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'blog title');
        done();
      });
  });

  it('should save all relations between user, blogPost, comment', (done) => {
    User.findOne({name: 'jane'})
      .populate({
        path: 'blogPosts', //attribute của object user
        model: 'blogPost',
        populate: { /*nghĩa là trong blogPosts, load comments của blogpost ra */
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'jane')
        assert(user.blogPosts[0].title === 'blog title');
        assert(user.blogPosts[0].comments[0].content === 'comment content');
        assert(user.blogPosts[0].comments[0].user.name === 'jane');
        done();
      });
  });
});