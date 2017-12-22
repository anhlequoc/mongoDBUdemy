const assert = require('assert');
const User = require('../src/users');

describe('updating user...', () => {
  let jane;

  beforeEach((done) => {
    jane = new User({name: 'jane', postCount: 2});
    jane.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        // console.log(jane.name);
        // console.log(users[0].name);
        assert(users[0].name === "janeeee");
        done();
      });
  }

  it('instance type update by using set and save method', (done) => {
    jane.set('name', 'janeeee'); // just change in memory, not change in db yet
    assertName(jane.save(), done);
  });

  it('An instance is updated by using update method', (done) => {
    assertName(jane.update({name: "janeeee"}), done);
    // chú ý ở hàm update, jane ở local sẽ không được lấy name mới là janeeee, mà vẫn giữ tên là jane, khác với set & save ở trên
  });

  it('A model can update all records match the criteria', (done) => {
    assertName(
      User.update({name: "jane"}, {name: "janeeee"}),
      done
    );
  });

  it('A model find first record that matches the criteria and update', (done)=> {
    assertName(
      User.findOneAndUpdate({name: "jane"}, {name: "janeeee"}),
      done
    );
  });

  it('A model findByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(jane._id, {name: "janeeee"}),
      done
    );
  });


  it('A model increment directly user in database postcount by 10', (done) => {
    //gửi lệnh trực tiếp lên db, không lưu user xuống server
    User.update({name: "jane"}, {$inc: {postCount: 10}}) //tìm tất cả object có name là "jane", cộng attribute postCount của nó thêm 10
      .then(() => User.findOne({name: "jane"}))
      .then((user) => {
        console.log(user.postCount);
        assert(user.postCount === 12); //không dùng jane.postCount vì object này nằm ở server, không phải lấy trực tiếp từ mongodb
        done();
      })
  });

});