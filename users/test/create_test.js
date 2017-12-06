const assert = require('assert');
const User = require('../src/users');

describe('Creating Records', () => {
  it('saves an user', (done) => {
    const Joe = new User({name: "Joe"});
    Joe.save()
      .then(() => {
        //check xem Joe đã save vào db hay chưa?
        assert(!Joe.isNew); //isNew là false nếu đã save vào db rồi, -> !isNew = true)
        done();
      }); //save to db
  });
});