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

  it('should allow adding post to existing record', (done) => {
    const jane = new User({
      name: 'jane',
      posts: []
    });

    jane.save()
      .then(() => User.findOne({name: 'jane'}) )
      .then((user) => {
        user.posts.push({ title: 'new post' });
        return user.save(); // dùng lệnh return để buộc js có kết quả từ hàm user.save() rồi mới chạy dòng lệnh 31 tiếp theo
      })
      .then(() => User.findOne({ name: 'jane'}) )
      .then((user) => {        
        assert(user.posts[0].title === 'new post');
        done();
      })
  });

  it("should removing subdocument from existing record", (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{title: 'current post'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert (user.posts.length === 0);
        done();
      })
  });
});