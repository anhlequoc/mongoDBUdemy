const assert = require('assert');
const User = require('../src/users');

describe('updating user...', () => {
  let jane;

  beforeEach((done) => {
    jane = new User({name: 'jane'});
    jane.save()
      .then(() => done());
  });

  it('instance type update by using set and save method', (done) => {
    jane.set('name', 'janeeee'); // just change in memory, not change in db yet
    assertName(jane.save(), done);
  });

  //instance update
  it('An instance is updated by using update method', (done) => {
    assertName(jane.update({name: "janeeee"}), done);
    // chú ý ở hàm update, jane ở local sẽ không được lấy name mới là janeeee, mà vẫn giữ tên là jane, khác với set & save ở trên
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        console.log(jane.name);
        console.log(users[0].name);
        assert(users[0].name === "janeeee");
        done();
      });
  }
});