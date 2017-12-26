const assert = require('assert');
const User = require('../src/users');

describe('Subdocument', () => {
  it('should create an user with a list of posts', (done) => {
    let joe = new User({
      name: 'Joe',
      posts: [{title: 'post title'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'post title');
        done();
      })
  });
});