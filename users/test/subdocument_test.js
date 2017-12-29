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

  it('should allow adding post to current user', (done) => {
    const jane = new User({
      name: 'jane',
      posts: []
    });

    jane.save()
      .then(() => User.findOne({name: 'jane'}) )
      .then((user) => {
        user.posts.push({ title: 'new post' });
        return user.save(); // dùng lệnh return để buộc js có kết quả từ hàm user.save() rồi mới chạy dòng lệnh tiếp theo
      })
      .then(() => User.findOne({ name: 'jane'}) )
      .then((user) => {        
        assert(user.posts[0].title === 'new post');
        done();
      })
  });
});