const assert = require ('assert');
const User = require ('../src/users.js');

describe('Reading user out of database', () => {
  let jane;

  beforeEach(() => {
    jane = new User ({name: "jane"}); //khai bao let jane ở ngoài để có thể access được
    jane.save()
      .then(() => done());
  })

  it('should find out all users of jane', () => {
    User.find({name: "jane"}) // chờ database tìm nên gọi là asynchronous
      .then((users) => { //users là data đc trả về
        console.log(users);
        done();
      })
  })
});