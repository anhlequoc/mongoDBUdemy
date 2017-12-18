const assert = require('assert');
const User = require ('../src/users');

describe('Deleting user...', () => {
  let joe;
  joe = new User ({ name: "joe"});

  beforeEach((done) => { //done: mình expect ở đây có 1 hành động asynchronous với database, đặt done ở đây để khi viết done() ở dưới thì có nghĩa là khi async chạy xong mới thực hiện các lệnh bên dưới
    joe.save()
      .then(() => done());
  });

  it('model instance remove', () => {
    joe.remove() //mất thời gian database trả về rồi mới remove xong
      .then(() => User.findOne({name: "joe"}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method remove', () => {

  });

  it('class method findAndRemove', () => {

  });

  it('class method findByIdAndRemove', () => {

  });


});