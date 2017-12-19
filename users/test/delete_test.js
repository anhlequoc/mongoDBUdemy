const assert = require('assert');
const User = require ('../src/users');

describe('Deleting user...', () => {
  let joe;
  joe = new User ({ name: "joe"});

  beforeEach((done) => { //done: mình expect ở đây có 1 hành động asynchronous với database, đặt done ở đây để khi viết done() ở dưới thì có nghĩa là khi async chạy xong mới thực hiện các lệnh bên dưới
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove() //mất thời gian database trả về rồi mới remove xong
      .then(() => User.findOne({name: "joe"}))
      .then((user) => { //chờ db trả về kết quả rồi mới thực hiện tiếp đc
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    //useful: remove a bunch of records that match criteria
    User.remove({ name: "joe" })
      .then(() => User.findOne( { name: "joe"}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'joe'})
      .then(() => User.findOne( { name: "joe"}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne( { name: "joe"}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});