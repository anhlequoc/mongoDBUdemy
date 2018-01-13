const assert = require ('assert');
const User = require ('../src/users.js');

describe('Reading user out of database', () => {
  let jane, a, b, c;

  beforeEach((done) => {
    jane = new User ({ name: "jane" }); //khai bao let jane ở ngoài để có thể access được
    a = new User( {name: 'AAA'} ); //chú ý có validation name phải hơn 2 ký tự
    b = new User( {name: 'BBB'} );
    c = new User( {name: 'CCC'} );
    
    // các user được save cùng lúc nên không biết user nào vào trước, user nào vào sau
    Promise.all([a.save(), jane.save(), b.save(), c.save()]) 
      .then(() => done());
  });

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

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({name: -1}) //name là trường sẽ dùng để sort, 1 là ascending, -1 là descending
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'CCC');
        assert(users[1].name === 'BBB');
        done();
      });
  });
});