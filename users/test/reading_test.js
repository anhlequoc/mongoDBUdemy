const assert = require ('assert');
const User = require ('../src/users.js');

describe('Reading user out of database', () => {
  let jane;

  beforeEach((done) => {
    jane = new User ({ name: "jane" }); //khai bao let jane ở ngoài để có thể access được
    jane.save()
      .then(() => done());
  })

  it('should find out all users of jane', (done) => {
    User.find({ name: "jane" }) // chờ database tìm nên gọi là asynchronous
      .then((users) => { //users là data đc trả về
        assert(users[0]._id.toString() === jane._id.toString());
        done();
      });
  });

  it('should find an user with a particular id', (done) => {
    User.findOne({ _id: jane._id })
      .then((user) => {
        assert(user.name === "jane");
        done();
      });

  });
});