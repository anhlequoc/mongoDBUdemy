const assert = require('assert');
const User = require('../src/users');

describe('Creating user and save it to database', () => {
  it('saves an user', (done) => {
    const Joe = new User({name: "Joe"});
    Joe.save() //save vào sẽ mất thời gian chờ nên chờ done rồi mới làm tiếp
      .then(() => {
        //check xem Joe đã save vào db hay chưa?
        assert(!Joe.isNew); //isNew là false nếu đã save vào db rồi, -> !isNew = true)
        done();
      }); //save to db
  });
});