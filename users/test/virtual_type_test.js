const assert = require('assert');
const User = require('../src/users');

describe('Virtual Type test', () => {
  it('postCount should count the number of posts', (done) => {
    const jane = new User({
      name: 'jane',
      posts: [{title: 'post 1'}, {title: 'post 2'}]
    });

    jane.save()
      .then(() => User.findOne({name: 'jane'}))
      .then((user) => {
        assert(user.postCount === 2);
        done(0);
      })
  });
});